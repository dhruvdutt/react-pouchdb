import PouchDB from 'pouchdb';

let db;

export function init(type, name, debug) {

  if (type === 'local')   db = new PouchDB(name);
  if (type === 'remote')  db = new PouchDB('http://localhost:5984/kittens');

  db.info().then(info => {
    console.log(type + ' DB ' + name + ' created', info);
  });

  debug ? enableDebug() : disableDebug();

  return db;
}

function enableDebug () {
  PouchDB.debug.enable('*');
}

function disableDebug () {
  PouchDB.debug.disable();
}

export function put(doc) {
  return db.put(doc);
}

export function post(doc) {
  return db.put(doc);
}

export function get(key) {
  return db.get(key);
}
