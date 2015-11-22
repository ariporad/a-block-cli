#!/usr/bin/env node
/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */

/**
 * WARNING TO EVERYONE: This is *NOT* ES6. It is whatever node >= 0.12 supports.
 *
 * This is also *NOT* tested or linted.
 */
require('../dist/cli')(process.argv.slice(2));
