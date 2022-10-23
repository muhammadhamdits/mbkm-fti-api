const { param, body } = require('express-validator')

module.exports = [
  param('programId').isInt().notEmpty(),
  body('courseIds').isArray().notEmpty()
]