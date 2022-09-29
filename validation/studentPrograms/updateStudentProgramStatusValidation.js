const { param, body } = require('express-validator')

module.exports = [
  param('studentProgramId').isInt().notEmpty(),
  body('status').isString().notEmpty()
]