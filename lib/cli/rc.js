/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
const fs = require('fs');
const os = require('os');
const path = require('path');
const _ = require('lodash');

const aBlockRcPath = path.resolve(os.homedir(), '.ablockrc');

let _config;
function getConfig(force = false) {
  if (_config && !force) return _config;
  try {
    _config = JSON.parse(fs.readFileSync(aBlockRcPath, 'utf8'));
  } catch (err) {
    _config = {};
  }
  return _config;
}

function save(config = getConfig()) {
  fs.writeFileSync(aBlockRcPath, JSON.stringify(config, null, 2));
}

function getKey(key) {
  return getConfig()[key];
}

function setKey(key, val) {
  const cfg = getConfig();
  cfg[key] = val;

  save(cfg);
  return cfg[key];
}

function unset(key) {
  const cfg = getConfig();
  const val = cfg[key];

  delete cfg[key];

  save(cfg);
  return val;
}

function replace(cfg) {
  save(cfg);
  getConfig(true);
  return cfg;
}

function defaults(cfg) {
  cfg = _.defaultsDeep({}, getConfig(), cfg);
  save(cfg);
  return getConfig(true);
}

module.exports = {
  'get': getKey,
  'set': setKey,
  unset,
  replace,
  defaults,
};
