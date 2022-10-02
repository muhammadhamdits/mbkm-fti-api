const { param, body } = require('express-validator')

module.exports = [
  param('courseId').isInt().notEmpty(),
  body('achievementCode').isInt().notEmpty(),
  body('title').isString().notEmpty()
]