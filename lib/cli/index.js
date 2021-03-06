/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
require('../setup');
const log = require('npmlog');

module.exports = function(args) {
  log.level = process.env.ABLOCK_LOG_LEVEL || process.env.A_BLOCK_LOG_LEVEL || 'warn';

  const argv = require('yargs')(args)
    .usage('Usage: $0 <command> [options]')
    .command('foo', 'Test command, please ignore.')
    .help('help')
    .alias('help', 'h')
    .demand(1)
    .argv;
  log.verbose('arguments', argv);

  const command = argv._.shift();
  log.verbose('command', command);

  require(`./commands/${command}`)({ argv, log });
};
