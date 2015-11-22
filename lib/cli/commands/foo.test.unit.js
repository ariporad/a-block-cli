/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
/* global expect:false, assert:false, request:false */
/* eslint-env mocha */
const foo = require('./foo');

describe('commands/foo', () => {
  it('should log.info something, including all arguments that were passed', () => {
    let logged = '';
    const log = {
      info(prefix, message) {
        if (typeof message !== 'string') message = JSON.stringify(message, null, 2);
        logged += `[info] ${prefix}: ${message}\n`;
      },
    };

    foo({ log, argv: { _: ['x', 'q', 'j' ] } });
    expect(logged).to.contain('info');
    expect(logged).to.contain('x');
    expect(logged).to.contain('q');
    expect(logged).to.contain('j');
  });
});
