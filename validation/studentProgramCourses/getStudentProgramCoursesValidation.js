const { query } = require('express-validator')

module.exports = [
  query('studentId').isInt().optional(),
  query('programId').isInt().notEmpty(),
  query('courseId').isInt().optional(),
  query('isAccepted').isBoolean().optional()
]