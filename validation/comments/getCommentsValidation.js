const { query, param } = require('express-validator')

module.exports = [
  param('logbookId').isInt().notEmpty(),
  query('date').isDate().optional()
]