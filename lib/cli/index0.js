/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
module.exports = function({ log }) {
  const argv = require('yargs')(rawArgv.slice(2)) // rawArgv is the same format as process.argv, and we don't care about the path to node.
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
