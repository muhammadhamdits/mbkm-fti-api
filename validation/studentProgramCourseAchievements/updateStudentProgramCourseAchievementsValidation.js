const { param, body } = require('express-validator')

module.exports = [
  param('programId').isInt().notEmpty(),
  param('courseId').isInt().notEmpty(),
  body('studentId').isInt().notEmpty(),
  body('achievementCodes').isArray().notEmpty(),
  body('scores').isArray().notEmpty()
]