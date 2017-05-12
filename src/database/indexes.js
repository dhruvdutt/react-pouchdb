import PouchDB from 'pouchdb';
import { db } from './pouchdb';

export function indexStudents() {

  let doc = {
    _id: '_design/my_index',
    views: {
      by_name: {
        map: (function (doc) { emit(doc.name); }).toString()
        // map: function (doc) { emit(doc.name); }.toString()
      }
    }
  };

  db.put(doc).then(function () {
    console.log('Students Index created');
  }).catch(function (err) {
    console.log(err);
  });

}
