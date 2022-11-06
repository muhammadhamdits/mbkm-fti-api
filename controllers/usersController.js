const Lecturer = require('../models').Lecturer

const index = async (req, res) => {
  // TODO
}

const getLecturers = async (req, res) => {
  lecturers = await Lecturer.findAll()
  return res.status(200).json({ lecturers })
}

module.exports = {
  index,
  getLecturers
}