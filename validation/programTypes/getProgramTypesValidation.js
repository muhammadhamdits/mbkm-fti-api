const { query } = require('express-validator')

module.exports = [
  query('id').isInt().optional(),
  query('name').isString().optional(),
  query('description').isString().optional()
]