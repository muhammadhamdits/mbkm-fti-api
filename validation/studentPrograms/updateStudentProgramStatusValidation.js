const { body } = require('express-validator')

module.exports = [
  body('studentId').isInt().notEmpty(),
  body('programId').isInt().notEmpty(),
  body('status').isString().notEmpty(),
  body('reason').isString()
]