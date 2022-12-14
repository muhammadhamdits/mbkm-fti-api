const { param, body } = require('express-validator')

module.exports = [
  param('programId').isInt().notEmpty(),
  body('title').isString().notEmpty(),
  body('startsAt').notEmpty(),
  body('endsAt').notEmpty(),
  body('description').isString().notEmpty(),
  body('courseId').isInt().notEmpty(),
  body('achievementCode').isString().notEmpty()
]