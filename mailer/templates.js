const utils = require('ethers').utils

module.exports = {
  Transfer: (node, owner, evt) => `Domain with node ${node} transfered to new owner ${owner}
  Raw data: ${JSON.stringify(evt)}`,
  NewOwner: (node, label, owner, evt) => `Subdomain with label ${label} on domain ${node} transfered to new owner ${owner}
  Raw data: ${JSON.stringify(evt)}`,
  NewResolver: (node, resolver, evt) => `New resolver at ${resolver} on domain ${node}
  Raw data: ${JSON.stringify(evt)}`,
  AuctionStarted: (hash, registrationDate, evt) => `Auction started on hash ${hash} with registration date ${new Date(registrationDate * 1000).toISOString()}
  Raw data: ${JSON.stringify(evt)}`,
  BidRevealed: (hash, owner, value, status, evt) => `Bid for ${value} releaved on hash ${hash} with owner ${owner} and status ${status}
  Raw data: ${JSON.stringify(evt)}`,
  HashRegistered: (hash, owner, value, registrationDate, evt) => `Hash ${hash} registered to ${owner} with value ${utils.formatEther(value)} ETH and registration date ${new Date(registrationDate * 1000).toISOString()}
  Raw data: ${JSON.stringify(evt)}`,
  HashReleased: (hash, value, evt) => `Hash ${hash} released with value ${utils.formatEther(value)}
  Raw data: ${JSON.stringify(evt)}`,
  HashInvalidated: (hash, name, value, registrationDate, evt) => `Hash ${hash} invalidated with name ${name} with value ${utils.formatEther(value)} and registration date ${new Date(registrationDate * 1000).toISOString()},
  Raw data: ${JSON.stringify(evt)}`
}