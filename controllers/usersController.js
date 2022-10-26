const Lecturer = require('../models').Lecturer

const getLecturers = async (req, res) => {
  lecturers = await Lecturer.findAll()
  return res.status(200).json({ lecturers })
}

module.exports = {
  getLecturers
}