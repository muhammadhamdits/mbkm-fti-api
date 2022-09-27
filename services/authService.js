require('dotenv').config()
const { JWT_SECRET, JWT_EXP } = process.env
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin')

const login = (params, res) => {
  const { username, password } = params
  Admin.findOne({ where: { username } })
    .then((admin) => {
      if (admin && bcrypt.compareSync(password, admin.password)) {
        const token = generateToken({ id: admin.id, username: admin.username })
        return { user: admin, token: token }
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
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