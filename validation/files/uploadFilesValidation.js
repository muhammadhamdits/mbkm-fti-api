const { query } = require('express-validator')

module.exports = [
  query('objectName').isString().notEmpty(),
  query('objectId').isString().notEmpty(),
  query('objectField').isString().notEmpty()
]