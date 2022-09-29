const { body } = require('express-validator')

module.exports = [
  body('name').isString().notEmpty(),
  body('description').isString().optional()
]