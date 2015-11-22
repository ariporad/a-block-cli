/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
/* global expect:false, assert:false, request:false */
/* eslint-env mocha */
const os = require('os');
const path = require('path');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();
// TODO: I like mock-fs (npm.im/mock-fs) a lot more, but it doesn't support node 4 yet:
const MemoryFs = require('memory-fs');

const aBlockRcPath = path.resolve(os.homedir(), '.ablockrc');

describe('rc', () => {
  let fs = null;
  beforeEach(() => {
    fs = new MemoryFs();
    fs.mkdirpSync(os.homedir());
  });

  afterEach(() => {
    if (fs) fs = null;
  });

  function loadRc() {
    return proxyquire('./rc', {
      fs,
    });
  }

  function writeABlockRc(aBlockRc) {
    if (typeof aBlockRc !== 'string') aBlockRc = JSON.stringify(aBlockRc, null, 2);
    fs.writeFileSync(aBlockRcPath, aBlockRc);
  }

  describe('#get', () => {
    it('should return the appropriate property of the config', () => {
      writeABlockRc({
        foo: 'bar',
      });

      expect(loadRc().get('foo')).to.equal('bar');
    });

    it('should handle an invalid JSON config', () => {
      writeABlockRc('foo bar baz');
      expect(() => loadRc().get('foo')).to.not.throw();

      writeABlockRc('{ foo: \"bar\" }');
      expect(() => loadRc().get('foo')).to.not.throw();
    });

    it('should handle no .ablockrc', () => {
      expect(() => loadRc().get('foo')).to.not.throw();
    });
  });

  describe('#set', () => {
    it('should set the config', () => {
      const rc = loadRc();
      rc.set('foo', 'bar');
      expect(rc.get('foo')).to.equal('bar');
    });

    it('should save the result to disk', () => {
      loadRc().set('foo', 'bar');

      const getRc = () => JSON.parse(fs.readFileSync(aBlockRcPath, 'utf8'));

      expect(getRc).to.not.throw();
      expect(getRc().foo).to.equal('bar');
    });
  });

  describe('#unset', () => {
    it('should unset the config', () => {
      writeABlockRc({
        foo: 'bar',
        baz: 5,
      });

      const rc = loadRc();
      rc.unset('foo');

      expect(rc.get('foo')).to.equal(undefined);
    });

    it('should save the result to disk', () => {
      writeABlockRc({
        foo: 'bar',
        baz: 5,
      });

      const rc = loadRc();
      rc.unset('foo');

      const rc2 = loadRc();
      expect(rc2.get('foo')).to.equal(undefined);
    });

    it('should return the value', () => {
      writeABlockRc({
        foo: 'bar',
        baz: 5,
      });

      const rc = loadRc();
      expect(rc.unset('foo')).to.equal('bar');
    });
  });

  describe('#replace', () => {
    it('should set the config', () => {
      writeABlockRc({
        foo: 1,
        bar: 2,
      });

      const rc = loadRc();
      rc.replace({
        foo: 'baz',
        bar: 'qux',
      });

      expect(rc.get('foo')).to.equal('baz');
    });

    it('should save the result to disk', () => {
      writeABlockRc({
        foo: 1,
        bar: 2,
      });

      const rc = loadRc();
      rc.replace({
        foo: 'baz',
        bar: 'qux',
      });

      const rc2 = loadRc();
      expect(rc2.get('foo')).to.equal('baz');
    });
  });

  describe('#defaults', () => {
    it('should merge the passed defaults object and the config', () => {
      writeABlockRc({
        foo: 'bar',
      });

      const rc = loadRc();
      rc.defaults({
        foo: 'baz',
        qux: -12,
      });

      expect(rc.get('foo')).to.equal('bar');
      expect(rc.get('qux')).to.equal(-12);
    });

    it('should save the result to disk', () => {
      writeABlockRc({
        foo: 'bar',
      });

      const rc = loadRc();
      rc.defaults({
        foo: 'baz',
        qux: -12,
      });

      const rc2 = loadRc();
      expect(rc2.get('foo')).to.equal('bar');
      expect(rc2.get('qux')).to.equal(-12);
    });
  });
});
