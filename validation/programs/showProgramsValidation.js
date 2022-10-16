const { param } = require('express-validator')

module.exports = [
  param('id').isInt().notEmpty()
]