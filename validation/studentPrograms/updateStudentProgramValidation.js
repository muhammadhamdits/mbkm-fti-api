const { param, body } = require('express-validator')

module.exports = [
  param('programId').isInt().notEmpty(),
  body('acceptanceFile').isString().notEmpty(),
  body('completionFile').isString().notEmpty(),
  body('transcriptFile').isString().notEmpty()
]