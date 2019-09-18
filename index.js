'use strict';

const fsViaCallback = require('./lib/files-callback.js');
const fsViaPromise = require('./lib/files-promise.js');
const file = process.argv.slice(2)[0];

const useCallbacks = (cb) => {
  fsViaCallback.read(file, (err,data) => {
    if(err) { console.error(err); }
    else {
      data.lastName = 'Callback';
      fsViaCallback.write(file, data, (err,result) => {
        if ( err ) { console.error(err); }
        else {
          fsViaCallback.read(file, (err,afterData) => {
            cb(afterData);
          });
        }
      });
    }
  });
};

const usePromise = () => {
  return fsViaPromise.read(file)
    .then( data => {
      data.lastName = 'Promise';
      return data;
    })
    .then( obj => fsViaPromise.write( file, obj ) )
    .then( result => fsViaPromise.read(file) )
    .catch(err => {throw err;});
};

const useAsync = async () => {

  let before = await fsViaPromise.read(file);
      before.lastName = 'Async';

  await fsViaPromise.write(file, before);

  let after = await fsViaPromise.read(file);

  return after;

};

usePromise()
  .then( (obj) => {
    console.log('Promise:', obj);
    return useAsync()
  })
  .then( (obj) => {
    console.log('Async:', obj);
    useCallbacks( (obj) => console.log('CB:', obj) );
  })
  .catch(err => console.error('ERR', err));

