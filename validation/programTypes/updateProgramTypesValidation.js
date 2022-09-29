const { body, param } = require('express-validator')

module.exports = [
  param('id').isInt().notEmpty(),
  body('name').isString().optional(),
  body('description').isString().optional()
]