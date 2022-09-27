require('dotenv').config()
const authLoginInput = require('../inputs/authLoginInput')
const authService = require('../services/authService')

const login = (req, res) => {
  input = authLoginInput(req.body, res)
  console.log(input)
  result = authService.login(input, res)
  res.status(200).json(result)
}

module.exports = {
  login
}