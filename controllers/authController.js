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
  authorizeUser(user, ['admin'], res)

  result = await axios.get(params.url)
  createdUser = await bulkCreateUsers(params.type, result.data)
  
  return res.status(200).json({ users: createdUser })
}

const bulkUpsertStudent = async (req, res) => {
  params = req.matchedData

  user = req.decoded
  authorizeUser(user, ['admin'], res)
  
  students = params.students

  try {
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
  } catch (error) {
    console.log(error)
  }
}

const bulkUpsertLecturer = async (req, res) => {
  params = req.matchedData

  user = req.decoded
  if(user.role != 'admin') return res.status(401).json({ message: 'Unauthorized' })

  lecturers = params.lecturers
  
  try {
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
  } catch (error) {
    console.log(error)
  }
}

const authorizeUser = (user, roles, res) => {
  if(!roles.includes(user.role)) return res.status(401).json({ message: 'Unauthorized' })
}

const decode = (req, res) => {
  user = req.decoded

  return res.status(200).json({ user })
}

// private functions

const getUser = async (username) => {
  user = await Admin.findOne({ where: { username } })
  if(!user) user = await Lecturer.findOne({ where: { nip: username } })
  if(!user) user = await Student.findOne({ where: { nim: username } })
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
      }
    })
    
    return students.data.students
  } else if(type == 'lecturer') {
    fetchUrl = `${BASE_URL}:${SERVER_PORT}/api/bulk-upsert/lecturers`
    lecturers = await axios.post(fetchUrl, JSON.stringify(data), {
      headers: { 
        'Authorization': `Bearer ${generateToken({ role: 'admin' })}`,
        'Content-Type': 'application/json'
      }
    })

    return lecturers.data.lecturers
  }
}

module.exports = {
  login,
  fetchUser,
  bulkUpsertStudent,
  bulkUpsertLecturer,
  authorizeUser,
  decode
}