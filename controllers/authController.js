require('dotenv').config()
const loginInput = require('../inputs/loginInput')
const authService = require('../services/authService')

const login = async (req, res) => {
  input = await loginInput(req.body)

  if (input.status != 202) result = input
  else result = await authService.login(input.output)

  res.status(result.status).json(result.output)
}

module.exports = {
  login
}