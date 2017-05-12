import PouchDB from 'pouchdb';

let dbInstance;
let dbServerInstance;

/**
 * Get the client database instance
 *
 * @returns   {Object}    Client database instance
 */
export function db() {
  if (dbInstance === undefined) throw Error ('Database not initialized/found.');
  return dbInstance;
}

/**
 * Get the server database instance
 *
 * @returns   {Object}    Server database instance
 */
export function dbServer() {
  if (dbServerInstance === undefined) throw Error ('Server database not initialized/found.');
  return dbServerInstance;
}

/**
 * Initialize database which defaults initializing client database
 *
 * @param     {!String}   type      Database type
 * @param     {!String}   name      Database name
 * @param     {!Boolean}  debug     Debug mode
 *
 * @returns   {Object}    Database instance
 */
export function init(type = 'local', name = 'db', debug = false) {
  return initClient(type, name, debug);
}

/**
 * Initialize Client database
 *
 * @param     {!String}   type      Database type
 * @param     {!String}   name      Database name
 * @param     {!Boolean}  debug     Debug mode
 *
 * @returns   {Object}    Database instance
 */
export function initClient(type = 'local', name = 'db', debug = false) {
  return dbInstance = create(type, name, debug);
}

/**
 * Initialize Server Database
 *
 * @param     {!String}   type      Database type
 * @param     {!String}   name      Database name
 * @param     {!Boolean}  debug     Debug mode
 *
 * @returns   {Object}    Database instance
 */
export function initServer(type = 'local', name = 'db', debug = false) {
  return dbServerInstance = create(type, name, debug);
}

/**
 * Initialize PouchDB database
 *
 * @param     {!String}   type      Database type
 * @param     {!String}   name      Database name
 * @param     {!Boolean}  debug     Debug mode
 *
 * @returns   {Object}    Database instance
 */
function create(type = 'local', name = 'db', debug = false) {

  let db;

  if (type === 'local')   db = new PouchDB(name);
  if (type === 'remote')  db = new PouchDB('http://localhost:5984/' + name);

  db.info().then(info => {
    console.log(type + ' DB ' + name + ' created', info);
  });

  debug ? PouchDB.debug.enable('*') : PouchDB.debug.disable();

  // Required for working with pouchdb-inspector
  if (typeof window !== "undefined") { window.PouchDB = PouchDB }

  return db;
}

/**
 * Sync client/server databases
 *
 * @returns   {Boolean}   Sync success/failure
 */
export function sync() {

  let clientDb = db(), serverDb = dbServer();

  clientDb.sync(serverDb, {
    live: true,
    retry: true
  }).on('complete', () => {
    console.log('Sync Complete');
    return true;
  }).on('error', err => {
    console.log('Sync Error', err);
    return false;
  });

}
