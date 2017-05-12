import PouchDB from 'pouchdb';

let dbInstance;

/**
 * Get the database instance to work with db methods
 *
 * @returns   {Object}    Database instance
 */
export function db() {
  return dbInstance;
}

/**
 * Initialize PouchDB Database
 *
 * @param     {!String}   type      Database type
 * @param     {!String}   name      Database name
 * @param     {!Boolean}  debug     Debug mode
 *
 * @returns   {Object}    Database instance
 */
export function init(type = 'local', name = 'db', debug = false) {

  if (type === 'local')   dbInstance = new PouchDB(name);
  if (type === 'remote')  dbInstance = new PouchDB('http://localhost:5984/kittens');

  dbInstance.info().then(info => {
    console.log(type + ' DB ' + name + ' created', info);
  });

  debug ? PouchDB.debug.enable('*') : PouchDB.debug.disable();

  // Required for working with pouchdb-inspector
  if (typeof window !== "undefined") { window.PouchDB = PouchDB }

  return dbInstance;

}

export function sync() {
  if (db() === undefined) throw Error ('Database not initialized/found.');
}
