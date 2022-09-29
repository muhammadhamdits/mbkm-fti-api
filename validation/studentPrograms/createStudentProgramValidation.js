const { param } = require('express-validator')

module.exports = [
  param('programId').isInt().notEmpty()
]