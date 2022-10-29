const Program = require('../models').Program
const Agency = require('../models').Agency
const Course = require('../models').Course
const Student = require('../models').Student
const Admin = require('../models').Admin
const Notification = require('../models').Notification
const ProgramType = require('../models').ProgramType
const ProgramCourse = require('../models').ProgramCourse
const StudentProgram = require('../models').StudentProgram
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  let programs = await Program.findAll({ 
    where: params, 
    include: ['agency', 'programType', 'courses'] 
  })

  if(user.role !== 'admin') programs = programs.filter(program => program.status == 'approved')

  return res.status(200).json({ programs })
}

const show = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  isRegistered = await StudentProgram.findOne({ where: {
    studentId: user.id,
    programId: params.id
  }})
  program = await Program.findOne({
    where: { id: params.id },
    include: ['agency', 'programType', 'courses']
  })

  return res.status(200).json({ program, isRegistered: !!isRegistered })
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

  let records = []
  if(user.role !== 'student'){
    studentIds = await Student.findAll({ attributes: ['id'] })
    studentIds = studentIds.map(student => student.id)
    records = studentIds.map(studentId => {
      return {
        userId: studentId,
        userRole: 'student',
        title: 'Program ditambahkan',
        message: `Program ${program.name} telah ditambahkan`,
        path: `/programs/${program.id}`
      }
    })
  }else{
    adminIds = await Admin.findAll({ attributes: ['id'] })
    adminIds = adminIds.map(admin => admin.id)
    records = adminIds.map(adminId => {
      return {
        userId: adminId,
        userRole: 'admin',
        title: 'Program diusulkan',
        message: `Program ${program.name} telah diusulkan oleh ${user.name}`,
        path: `/programs`
      }
    })
  }
  await Notification.bulkCreate(records)

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

  if(params.status){
    studentIds = await Student.findAll({ attributes: ['id'] })
    studentIds = studentIds.map(student => student.id)
    records = studentIds.map(studentId => {
      return {
        userId: studentId,
        userRole: 'student',
        title: `Program ${params.status == 'approved' ? 'disetujui' : 'ditolak'}`,
        message: `Usulan program ${program.name} telah ${params.status == 'approved' ? 'disetujui' : 'ditolak'}`,
        path: `/programs/${program.id}`
      }
    })
    await Notification.bulkCreate(records)
  }

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

const setCourses = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  program = await Program.findByPk(params.programId)
  if (!program) return res.status(404).json({ message: 'Program not found' })

  courses = await Course.findAll({ where: { id: params.courseIds } })
  if (courses.length != params.courseIds.length) 
    return res.status(404).json({ message: 'Some course not found' })
  
  allCourseIds = await Course.findAll({ attributes: ['id']})
  allCourseIds = allCourseIds.map(course => course.id)
  notInNewCourses = allCourseIds.filter(courseId => !params.courseIds.includes(courseId))

  currentProgramCourses = await ProgramCourse.findAll({ where: { programId: params.programId } })
  await ProgramCourse.destroy({ where: {
    programId: params.programId,
    courseId: notInNewCourses
  }})

  records = params.courseIds.map(courseId => {
    return { programId: params.programId, courseId, deletedAt: null }
  })
  
  await ProgramCourse.bulkCreate(records, { updateOnDuplicate: ['deletedAt'] })

  return res.status(200).json({ message: 'Courses updated' })
}

module.exports = {
  index,
  create,
  update,
  destroy,
  show,
  setCourses
}