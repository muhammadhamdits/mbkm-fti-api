const { body, param } = require('express-validator')

module.exports = [
  body('url').notEmpty(),
  param('type').notEmpty().isIn(['student', 'lecturer'])
]