/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
/* global expect:false, assert:false, request:false */
/* eslint-env mocha */
const proxyquire = require('proxyquire').noPreserveCache();

const noop = () => void 0;

function loadCLI(foo = noop, args = ['foo'], otherMocks = {}) {
  if (args[0] !== 'foo') console.log('Warning: you didn\'t pass \'foo\' as the first argument to loadCLI, so the mock foo command won\'t be called');
  proxyquire('./index', {
    './commands/foo': foo,
    ...otherMocks,
  })(args);
}

describe('cli', () => {
  describe('commands', () => {
    it('should require commands/<command>', (done) => {
      loadCLI(() => done());
    });

    it('should pass in `{ argv }`', (done) => {
      loadCLI(({ argv }) => {
        expect(argv._).to.deep.equal(['bar', 'baz']);
        done();
      }, ['foo', 'bar', 'baz']);
    });

    it('should pass in `{ log }`', (done) => {
      loadCLI(({ log }) => {
        [
          'error',
          'warn',
          'http',
          'info',
          'verbose',
          'silly',
          'log',
        ].forEach(prop => {
          expect(log).to.have.property(prop);
          expect(log[prop]).to.be.a('function');
        });
        done();
      });
    });
  });
});
