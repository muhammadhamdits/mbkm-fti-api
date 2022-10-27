const { param, query } = require('express-validator')

module.exports = [
  param('programId').isInt().notEmpty(),
  query('studentId').isInt()
]