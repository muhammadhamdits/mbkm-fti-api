const Lecturer = require('../models').Lecturer
const Admin = require('../models').Admin
const Student = require('../models').Student

const index = async (req, res) => {
  lecturers = await Lecturer.findAll()
  admins = await Admin.findAll()
  students = await Student.findAll()

  users = lecturers.map(lecturer => {
    lecturer = lecturer.toJSON()
    lecturer.username = lecturer.nip
    lecturer.role = 'lecturer'
    return lecturer
  }).concat(admins.map(admin => {
    admin = admin.toJSON()
    admin.role = 'admin'
    return admin
  })).concat(students.map(student => {
    student = student.toJSON()
    student.username = student.nim
    student.role = 'student'
    return student
  }))

  return res.status(200).json({ users })
}

const getLecturers = async (req, res) => {
  lecturers = await Lecturer.findAll()
  return res.status(200).json({ lecturers })
}

module.exports = {
  index,
  getLecturers
}