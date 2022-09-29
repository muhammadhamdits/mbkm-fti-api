const { body } = require('express-validator')

module.exports = [
  body('name').isString().notEmpty(),
  body('isCertified').optional().isBoolean(),
  body('isRemote').optional().isBoolean(),
  body('startsAt').optional().isDate(),
  body('endsAt').optional().isDate(),
  body('openAt').optional().isDate(),
  body('closeAt').optional().isDate(),
  body('minTerms').optional().isInt(),
  body('sksCount').optional().isInt(),
  body('agencyId').isInt().notEmpty(),
  body('programTypeId').isInt().notEmpty()
]