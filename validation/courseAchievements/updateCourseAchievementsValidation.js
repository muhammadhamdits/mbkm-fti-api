const { param, body } = require('express-validator')

module.exports = [
  param('courseId').isInt().notEmpty(),
  body('achievementCodes').isArray().notEmpty(),
  body('titles').isArray().notEmpty()
]