const { param, body } = require('express-validator')

module.exports = [
  param('logbookId').isInt().notEmpty(),
  body('text').isString().notEmpty()
]