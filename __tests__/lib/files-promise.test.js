'use strict';

jest.mock('fs');

const faker = require('faker');
const files = require('../../lib/files-promise.js');

describe('Files Handler', () => {

  it('properly writes an object to file', () => {
    let obj = {foo:'bar'};
    return files.write('test.json', obj)
      .then( success => {
        expect(success).toBeTruthy();
        return files.read('test.json');
      })
      .then( json => {
        expect(json.foo).toEqual('bar');
      });
  });

  it('properly writes a JSON string to file', () => {
    let obj = {foo:'bar'};
    let str = JSON.stringify(obj);
    return files.write('test.json', str)
      .then( success => {
        expect(success).toBeTruthy();
        return files.read('test.json');
      })
      .then( json => {
        expect(json.foo).toEqual('bar');
      });
  });

  it('fails properly, given invalid JSON', () => {
    let obj = 'test';
    return files.write('test.json', obj)
      .then( success => {
        expect(success).not.toBeDefined();
      })
      .catch(e => {
        expect(e).toBeDefined();
      });
  });

});
