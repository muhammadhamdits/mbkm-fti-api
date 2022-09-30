const { body, param } = require('express-validator')

module.exports = [
  body('studentId').isInt().notEmpty(),
  param('programId').isInt().notEmpty(),
  body('courseIds').isArray().notEmpty(),
  body('isAccepted').isBoolean().notEmpty()
]