/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
const gulp = require('gulp');
const { spawn } = require('child_process');
const { resolve } = require('path');
const compile = require('./lib/compile');
const config = require('./lib/config');
const { mocha } = require('./lib/plugins');
const { logErrors, toDest, streamToPromise } = require('./lib/helpers');


const runMocha = (type) => {
  const originalMochaFiles = config.mocha.files;
  config.mocha.files = config.tests[type];
  return new Promise((good, bad) => {
    spawn(config.mocha.pathToMocha, config.mocha.opts, {
      cwd: resolve(__dirname, '..'),
      stdio: 'inherit',
      env: config.mocha.env,
    })
      .on('close', code => code === 0 ? good() : bad(new Error('Tests Failed')))
      .on('error', bad);
  }).finally(() => config.mocha.files = originalMochaFiles);
};

const test = (type) => {
  return compile(config.srcJs, config.dest).promise
    .then((arg) => runMocha(type, arg));
};

const testTaskDeps = ['lint'];
const defineTestTask = (name, type) => gulp.task(name, testTaskDeps, () => test(type));

config.tests.types.map(type => defineTestTask(`test:${type}`, type));
defineTestTask('test', 'all');

module.exports = test;
