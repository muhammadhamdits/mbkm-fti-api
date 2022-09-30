const Program = require('../models').Program
const StudentProgram = require('../models').StudentProgram
const { authorizeUser } = require('../controllers/authController')

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student'], res)

  program = await Program.findByPk(params.programId)
  if (!program) return res.status(404).json({ message: 'Program not found' })

  studentProgram = await StudentProgram.create({
    studentId: user.id,
    programId: params.programId
  })

  return res.status(200).json({ studentProgram })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student'], res)

  studentProgram = await StudentProgram.findOne({
    where: {
      studentId: user.id,
      programId: params.programId
    }
  })
  if (!studentProgram) 
    return res.status(404).json({ message: 'Student program not found' })
  
  studentProgram = await studentProgram.update(params)

  return res.status(200).json({ studentProgram })
}

const assignLecturer = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  studentProgram = await StudentProgram.findByPk(params.studentProgramId)
  if (!studentProgram)
    return res.status(404).json({ message: 'Student program not found' })

  studentProgram = await studentProgram.update(params)

  return res.status(200).json({ studentProgram })
}

const updateStatus = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  studentProgram = await StudentProgram.findByPk(params.studentProgramId)
  if (!studentProgram)
    return res.status(404).json({ message: 'Student program not found' })

  studentProgram = await studentProgram.update(params)

  return res.status(200).json({ studentProgram })
}

module.exports = {
  create,
  update,
  assignLecturer,
  updateStatus
}