const { param } = require('express-validator')

module.exports = [
  param('courseId').isInt().notEmpty()
]