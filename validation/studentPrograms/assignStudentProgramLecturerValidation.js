const { param } = require('express-validator')

module.exports = [
  param('studentProgramId').isInt().notEmpty(),
  param('lecturerId').isInt().notEmpty()
]