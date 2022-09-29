const { check } = require('express-validator')

module.exports = [
  check('lecturers.*.name').notEmpty(),
  check('lecturers.*.nip').notEmpty().isNumeric()
]