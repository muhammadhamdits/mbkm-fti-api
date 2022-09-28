const applicationInput = require('./applicationInput')

module.exports = async (params) => {
  keys = {
    required: ['password'],
    optional: ['username', 'nip', 'nim']
  }

  return await applicationInput(keys, params, 'only')
}