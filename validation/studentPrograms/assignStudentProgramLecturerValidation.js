const { body } = require('express-validator')

module.exports = [
  body('studentId').isInt().notEmpty(),
  body('programId').isInt().notEmpty(),
  body('lecturerId').isInt().notEmpty()
]