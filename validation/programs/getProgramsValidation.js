const { query } = require('express-validator')

module.exports = [
  query('id').isInt().optional(),
  query('name').isString().optional(),
  query('isCertified').optional().isBoolean(),
  query('isRemote').optional().isBoolean(),
  query('startsAt').optional().isDate(),
  query('endsAt').optional().isDate(),
  query('openAt').optional().isDate(),
  query('closeAt').optional().isDate(),
  query('minTerms').optional().isInt(),
  query('sksCount').optional().isInt(),
  query('agencyId').optional().isInt(),
  query('programTypeId').optional().isInt()
]