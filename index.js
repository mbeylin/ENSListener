

require('commander')
.version(require('./package.json').version)
.arguments('<domain name> <email> [network]')
.action((name, email, network) => {
  require('./watch')(name, email, network)
  process.stdin.resume();
})
.parse(process.argv)

