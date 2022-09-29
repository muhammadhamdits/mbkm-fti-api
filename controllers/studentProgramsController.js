const Program = require('../models').Program
const StudentProgram = require('../models').StudentProgram

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

module.exports = {
  create
}