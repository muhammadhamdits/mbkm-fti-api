const Admin = require('../models').Admin
const Lecturer = require('../models').Lecturer
const Student = require('../models').Student
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { JWT_SECRET, JWT_EXP } = process.env

const login = async (req, res) => {
  params = req.matchedData
  err_msg = 'Invalid username or password'
  
  user = await getUser(params.username)
  if(!user) return res.status(401).json({ message: err_msg })

  isValidPassword = await bcrypt.compare(params.password, user.password)
  if(!isValidPassword) return res.status(401).json({ message: err_msg })
  
  payload = buildPayload(user)

  return res.status(200).json({ token: generateToken(payload) })
}

const fetchUser = async (req, res) => {
  params = req.matchedData
  
  user = req.decoded
  if(user.role != 'admin') return res.status(401).json({ message: 'Unauthorized' })

  result = await axios.get(params.url)
  
  createdUser = bulkCreateUsers(params.type, result.data)
  
  return res.status(200).json({ message: 'success' })
}

const getUser = async (username) => {
  user = await Admin.findOne({ username: username })
  if(!user) user = await Lecturer.findOne({ nip: username })
  if(!user) user = await Student.findOne({ nim: username })
  return user
}

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXP })
  return token
}

const buildPayload = (user) => {
  id = user.id
  username = user.username || user.nip || user.nim
  
  if(user.username) role = 'admin'
  else if(user.nip) role = 'lecturer'
  else if(user.nim) role = 'student'

  return { id, username, role }
}

const bulkCreateUsers = async (type, data) => {
  if(type == 'student') {
    Student.bulkCreate(data,
      {
        fields: ['name', 'nim'],
        updateOnDuplicate: ['name']
      }
    )
  } else if(type == 'lecturer') {
    Lecturer.bulkCreate(data,
      {
        fields: ['name', 'nip'],
        updateOnDuplicate: ['name']
      }
    )
  }
}

module.exports = {
  login,
  fetchUser
}