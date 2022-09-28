const { validationResult, matchedData } = require('express-validator')

module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      req.matchedData = matchedData(req)
      
      return next()
    }
    
    return res.status(422).json({ errors: errors.array() })
  }
}