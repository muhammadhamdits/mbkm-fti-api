const { body } = require('express-validator')

module.exports = [
  body('name').isString().notEmpty(),
  body('address').isString().optional(),
  body('webUrl').isString().optional(),
  body('description').isString().optional(),
  body('field').isString().optional()
]