const applicationInput = require('./applicationInput')

module.exports = async (params) => {
  keys = {
    required: ['username', 'password'],
    optional: []
  }

  return await applicationInput(keys, params)
}