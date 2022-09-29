const { body, param } = require('express-validator')

module.exports = [
  param('id').notEmpty().isInt(),
  body('name').isString().optional(),
  body('address').isString().optional(),
  body('webUrl').isString().optional(),
  body('description').isString().optional(),
  body('field').isString().optional()
]