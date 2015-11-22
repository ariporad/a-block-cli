/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
module.exports = function foo({ argv: { _: args }, log }) {
  log.info('foo', 'Hi There! Welcome to the `foo` test command! You called this command with the following arguments:');
  log.info('args', args.join(', '));
};
