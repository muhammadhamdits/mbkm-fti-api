const { param } = require('express-validator')

module.exports = [
  param('studentProgramId').isInt().notEmpty()
]