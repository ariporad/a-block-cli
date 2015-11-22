/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
/* global expect:false, assert:false, request:false */
/* eslint-env mocha */
const proxyquire = require('proxyquire').noPreserveCache();

describe('cli', () => {
  describe('commands', () => {
    it('should require commands/<command>', (done) => {
      proxyquire('./index', {
        './commands/foo': () => done(), // Ignore args
      })(['foo']);
    });

    it('should pass in argv, without the command', (done) => {
      proxyquire('./index', {
        './commands/foo': (argv) => {
          expect(argv._).to.deep.equal(['bar', 'baz']);
          done();
        },
      })(['foo', 'bar', 'baz']);
    });
  });
});
