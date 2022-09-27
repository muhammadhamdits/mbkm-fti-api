module.exports = (params, res) => {
  const expressValidator = require('express-validator')
  const { validationResult, body } = expressValidator
  
  body('username')
  body('password')

  const errors = validationResult(params)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
}