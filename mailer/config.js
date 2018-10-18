module.exports = {
  defaults: {
    from: 'asd@asd.com'
  },
  smtp: {
    host: 'smtp.mail.com',
    port: 587,
    secure: false, 
    auth: {
        user: 'user',
        pass: 'password'
    }
  }
}