'use strict';

const fs = require('fs');

module.exports = exports = {};

/**
 * Wraps fs.readFile, processes the file as a JSON string, returning the object to the Callback
 * Flags an error on all fs errors as well as a malformed JSON string in the file itself
 * @param file - Full filesystem path to the file to read
 * @param cb - Error First Callback
 */
exports.read = (file,cb) => {
  fs.readFile(file, (err,data) => {
    if(err) { cb(err); }
    else {
      try{
        cb(null, JSON.parse(data.toString().trim()));
      } catch(e) { cb(e); }
    }
  });
};

/**
 * Wraps fs.writeFile, processing the "text" as JSON when it presents as an object.
 * Passes return values (success and errors) through the callback param
 * @param file - Filesystem Path to the file to write
 * @param text - Can be straight text or an Object
 * @param cb - Error First Callback
 */
exports.write = (file, text, cb) => {
  let buffer = Buffer.from( typeof text === 'object' ? JSON.stringify(text) : text);
  fs.writeFile( file, buffer, cb );
};
