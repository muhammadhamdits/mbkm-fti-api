const Admin = require('../models').Admin
const Lecturer = require('../models').Lecturer
const Student = require('../models').Student
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { JWT_SECRET, JWT_EXP, BASE_URL, SERVER_PORT } = process.env

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
  createdUser = await bulkCreateUsers(params.type, result.data)
  
  return res.status(200).json({ users: createdUser })
}

const bulkUpsertStudent = async (req, res) => {
  params = req.matchedData

  user = req.decoded
  if(user.role != 'admin') return res.status(401).json({ message: 'Unauthorized' })

  students = params.students
  upsertStudents = await Student.bulkCreate(students,
    { 
      returning: true,
      fields: ['nim', 'name'],
      updateOnDuplicate: ['name']
    }
  )

  students = upsertStudents.map(student => { return student.dataValues })
  students = students.map(({id, ...rest}) => { return rest })

  return res.status(200).json({ students })
}

const bulkUpsertLecturer = async (req, res) => {
  params = req.matchedData

  user = req.decoded
  if(user.role != 'admin') return res.status(401).json({ message: 'Unauthorized' })

  lecturers = params.lecturers
  upsertLecturers = await Lecturer.bulkCreate(lecturers,
    {
      returning: true,
      fields: ['nip', 'name'],
      updateOnDuplicate: ['name']
    }
  )

  lecturers = upsertLecturers.map(lecturer => { return lecturer.dataValues })
  lecturers = lecturers.map(({id, ...rest}) => { return rest })

  return res.status(200).json({ lecturers })
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
    fetchUrl = `${BASE_URL}:${SERVER_PORT}/api/bulk-upsert/students`
    students = await axios.post(fetchUrl, JSON.stringify(data), {
      headers: { 
        'Authorization': `Bearer ${generateToken({ role: 'admin' })}`,
        'Content-Type': 'application/json'
      },
    })
    
    return students.data.students
  } else if(type == 'lecturer') {
    fetchUrl = `${BASE_URL}:${SERVER_PORT}/api/bulk-upsert/lecturers`
    lecturers = await axios.post(fetchUrl, JSON.stringify(data), {
      headers: { 
        'Authorization': `Bearer ${generateToken({ role: 'admin' })}`,
        'Content-Type': 'application/json'
      },
    })

    return lecturers.data.lecturers
  }
}

module.exports = {
  login,
  fetchUser,
  bulkUpsertStudent,
  bulkUpsertLecturer
}