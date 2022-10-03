const { param, query } = require('express-validator')

module.exports = [
  param('programId').isInt().notEmpty(),
  param('courseId').isInt().notEmpty(),
  query('studentId').isInt().optional()
]