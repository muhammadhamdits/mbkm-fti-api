const { param, body } = require('express-validator')

module.exports = [
  param('programId').isInt().notEmpty(),
  param('courseId').isInt().notEmpty(),
  body('studentId').isInt().notEmpty(),
  body('achievementCode').isInt().notEmpty(),
  body('score').isInt().notEmpty()
]