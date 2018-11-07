const ethers = require('ethers')
const interfaces = require('./interfaces')
const Mailer = require('./mailer')

class Watcher {
 constructor(domain, email, network) {
    this.domain = domain
    this.network = network
    this.nameHash = ethers.utils.namehash(domain)
    this.labelHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(domain.split('.')[0]))
    this.ensInterface = interfaces.ensInterface
    this.registrarInterface = interfaces.registrarInterface
    this.provider = ethers.getDefaultProvider(network)
    this.mailer = new Mailer(email, domain)
    this.watch()
  }

  async watch () {
    const net = await this.provider.getNetwork()
    const ensContract = new ethers.Contract(net.ensAddress, this.ensInterface, this.provider)
    const registrarAddress = await ensContract.owner(ethers.utils.namehash('eth'))
    const registrarContract = new ethers.Contract(registrarAddress, this.registrarInterface, this.provider)
    const ensFilters = [
      ensContract.filters.Transfer(this.nameHash),
      ensContract.filters.NewOwner(this.nameHash),
      ensContract.filters.NewResolver(this.nameHash),
      ensContract.filters.NewTTL(this.nameHash)
    ]
    const registrarFilters = [
      registrarContract.filters.AuctionStarted(this.labelHash),
      registrarContract.filters.BidRevealed(this.labelHash),
      registrarContract.filters.HashRegistered(this.labelHash),
      registrarContract.filters.HashReleased(this.labelHash),
      registrarContract.filters.HashInvalidated(this.labelHash),
    ]

    ensFilters.forEach(filter => {
      ensContract.on(filter, (...args) => {
        this.mailer.sendMail(args)
      })
    })
    registrarFilters.forEach(filter => {
      registrarContract.on(filter, (...args) => {
        this.mailer.sendMail(args)
      })
    });
  }
}

module.exports = (name, email, network) => {
  if (network === 'mainnet' || network == undefined) {
    network = 'homestead'
  } else if (network !== 'ropsten') {
    throw(`Invalid network: valid networks are 'mainnet' and 'ropsten'`)
  }
  global.watcher = new Watcher(name, email, network)
}