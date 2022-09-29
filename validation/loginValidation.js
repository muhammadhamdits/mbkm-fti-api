const { body } = require('express-validator')

module.exports = [
  body('username').notEmpty(),
  body('password').notEmpty()
]