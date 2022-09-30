const { query, param } = require('express-validator')

module.exports = [
  query('studentId').isInt().optional(),
  param('programId').isInt().notEmpty(),
  query('courseId').isInt().optional(),
  query('isAccepted').isBoolean().optional()
]