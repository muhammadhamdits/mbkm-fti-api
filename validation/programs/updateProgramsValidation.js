const { body, param } = require('express-validator')

module.exports = [
  param('id').isInt().notEmpty(),
  body('name').isString().optional(),
  body('isCertified').optional().isBoolean(),
  body('isRemote').optional().isBoolean(),
  body('startsAt').optional().isDate(),
  body('endsAt').optional().isDate(),
  body('openAt').optional().isDate(),
  body('closeAt').optional().isDate(),
  body('minTerms').optional().isInt(),
  body('sksCount').optional().isInt(),
  body('agencyId').isInt().optional(),
  body('programTypeId').isInt().optional(),
  body('status').optional().isIn(['approved', 'rejected'])
]