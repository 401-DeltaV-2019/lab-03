'use strict';

const fs = require('fs');
const util = require('util');
const write = util.promisify(fs.writeFile);
const read = util.promisify(fs.readFile);

module.exports = exports = {};

/**
 * Wraps fs.readFile as a promise, processes the file as a JSON string, resolving with a JS object or null
 * Rejects with error on all fs errors as well as a malformed JSON string in the file itself
 * @param file - Full filesystem path to the file to read
 * @returns {Promise<T>}
 */
exports.read = (file) => read(file)
  .then( contents => {
    try{
      return JSON.parse(contents.toString().trim());
    } catch(e) { throw 'Invalid JSON'; }
  })
  .catch(err => {throw err;});

/**
 * Wraps fs.writeFile as a promise, processing the "text" as JSON when it presents as an object.
 * @param file - Filesystem Path to the file to write
 * @param text - Can be straight text or an Object
 */
exports.write = (file, text) => {
  let contents = Buffer.from( typeof text === 'object' ? JSON.stringify(text) : text );
  return write(file, contents )
    .then( success => success )
    .catch(err => {throw err;});
};

