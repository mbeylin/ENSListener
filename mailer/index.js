const config = require('./config')
const templates = require('./templates')
const nodemailer = require('nodemailer')

module.exports = class Mailer {
  constructor(emailAddr, domain) {
    this.transport = nodemailer.createTransport(config.smtp, config.defaults)
    this.addr = emailAddr
    this.domain = domain
    this.transport.verify((err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log('Ready')
      }
    })
  }

  async sendMail (args) {
    console.log('ARGS', args)
    const message = {
      subject: `ENS DOMAIN LISTENER: ${this.domain}`,
      to: this.addr,
      text: templates[args[args.length - 1].event](...args)
    }
    this.transport.sendMail(message)
  }
}
