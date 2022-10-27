const { param, body } = require('express-validator')

module.exports = [
  param('id').isInt().notEmpty(),
  body('status').isString().optional(),
  body('courseId').isInt().optional(),
  body('achievementCode').isString().optional()
]