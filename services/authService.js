require('dotenv').config()
const { JWT_SECRET, JWT_EXP } = process.env
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models').Admin

const login = async (params) => {
  const { username, password } = params
  const admin = await Admin.findOne({ where: { username } })

  err_msg = "Username or password is incorrect"
  if (!admin) return { status: 401, output: { message: err_msg } }

  const isPasswordValid = await bcrypt.compare(password, admin.password)
  const { password: _, ...adminData } = admin.dataValues
  if (!isPasswordValid) return { status: 401, output: { message: err_msg } }

  const token = generateToken(adminData)
  return { status: 200, output: { token } }
}

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXP })
  return token
}

const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET)
  return decoded
}

module.exports = {
  login
}