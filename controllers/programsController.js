const Program = require('../models').Program
const Agency = require('../models').Agency
const Course = require('../models').Course
const ProgramType = require('../models').ProgramType
const ProgramCourse = require('../models').ProgramCourse
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  let programs = await Program.findAll({ 
    where: params, 
    include: ['agency', 'programType'] 
  })

  if(user.role !== 'admin') programs = programs.filter(program => program.status == 'approved')

  return res.status(200).json({ programs })
}

const show = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  program = await Program.findOne({
    where: { id: params.id },
    include: ['agency', 'programType']
  })

  return res.status(200).json({ program })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded
  
  authorizeUser(user, ['admin', 'student'], res)
  if(user.role == 'student') params.status = 'proposed'
  else params.status = 'approved'

  agency = await Agency.findByPk(params.agencyId)
  if (!agency) return res.status(404).json({ message: 'Agency not found' })

  programType = await ProgramType.findByPk(params.programTypeId)
  if (!programType) return res.status(404).json({ message: 'Program type not found' })

  program = await Program.create(params)
  program = await Program.findByPk(program.id, { include: ['agency', 'programType'] })

  return res.status(200).json({ program })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  program = await Program.findByPk(params.id)
  if (!program) return res.status(404).json({ message: 'Program not found' })

  if(params.agencyId) {
    agency = await Agency.findByPk(params.agencyId)
    if (!agency) return res.status(404).json({ message: 'Agency not found' })
  }

  if(params.programTypeId) {
    programType = await ProgramType.findByPk(params.programTypeId)
    if (!programType) return res.status(404).json({ message: 'Program type not found' })
  }

  await program.update(params)
  program = await Program.findByPk(params.id, { include: ['agency', 'programType'] })

  return res.status(200).json({ program })
}

const destroy = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  program = await Program.findByPk(params.id)
  if (!program) return res.status(404).json({ message: 'Program not found' })

  await program.destroy()

  return res.status(200).json({ message: 'Program deleted' })
}

const addCourse = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  program = await Program.findByPk(params.programId)
  if (!program) return res.status(404).json({ message: 'Program not found' })

  courses = await Course.findAll({ where: { id: params.courseIds } })
  if (courses.length != params.courseIds.length) 
    return res.status(404).json({ message: 'Some course not found' })
  
  await ProgramCourse.bulkCreate(params.courseIds.map(courseId => {
    return { programId: params.programId, courseId }
  }))

  return res.status(200).json({ message: 'Courses added' })
}

const discardCourse = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  program = await Program.findByPk(params.programId)
  if (!program) return res.status(404).json({ message: 'Program not found' })
  
  course = await Course.findByPk(params.courseId)
  if (!course) return res.status(404).json({ message: 'Course not found' })
  
  programCourse = await ProgramCourse.findOne({ where: { 
    programId: params.programId,
    courseId: params.courseId 
  }})
  if (!programCourse) return res.status(404).json({ message: 'Course not found in program' })

  await programCourse.destroy()

  return res.status(200).json({ message: 'Course discarded from program' })
}

module.exports = {
  index,
  create,
  update,
  destroy,
  addCourse,
  discardCourse,
  show
}