const { check } = require('express-validator')

module.exports = [
  check('students.*.name').notEmpty(),
  check('students.*.nim').notEmpty().isNumeric()
]