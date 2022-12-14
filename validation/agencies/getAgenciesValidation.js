const { query } = require('express-validator')

module.exports = [
  query('id').isInt().optional(),
  query('name').isString().optional(),
  query('address').isString().optional(),
  query('webUrl').isString().optional(),
  query('description').isString().optional(),
  query('field').isString().optional()
]