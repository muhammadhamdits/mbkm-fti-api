const StudentProgramCourse = require('../models').StudentProgramCourse
const Program = require('../models').Program
const Course = require('../models').Course
const { authorizeUser } = require('./authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student', 'admin', 'lecturer'], res)

  if(user.role === 'student') params.studentId = user.id

  studentProgramCourses = await StudentProgramCourse.findAll({
    where: params,
    include: ['course']
  })

  return res.status(200).json({ studentProgramCourses })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student'], res)

  program = await Program.findByPk(params.programId)
  if(!program) return res.status(404).json({ error: 'Program not found' })
  if(program.studentId !== user.id) return res.status(401).json({ error: 'Unauthorized' })

  courses = await Course.findAll({
    where: { id: params.courseIds }
  })
  if(courses.length !== params.courseIds.length) 
    return res.status(404).json({ error: 'Some course not found' })

  availableCourses = program.courses
  if(!availableCourses.some(course => params.courseIds.includes(course.id)))
  return res.status(404).json({ error: 'Some course not available' })

  studentProgramCourses = await StudentProgramCourse.bulkCreate(
    params.courseIds.map(courseId => {
      return { studentId: user.id, programId: params.programId, courseId }
    })
  )
}

const discard = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student'], res)

  program = await Program.findByPk(params.programId)
  if(!program) return res.status(404).json({ error: 'Program not found' })
  if(program.studentId !== user.id) return res.status(401).json({ error: 'Unauthorized' })

  courses = await Course.findAll({
    where: { id: params.courseIds }
  })
  if(courses.length !== params.courseIds.length)
    return res.status(404).json({ error: 'Some course not found' })

  studentProgramCourses = await StudentProgramCourse.findAll({
    where: { studentId: user.id, programId: params.programId, courseId: params.courseIds }
  })
  if(studentProgramCourses.length !== params.courseIds.length)
    return res.status(404).json({ error: 'Some course not found' })

  await StudentProgramCourse.destroy({
    where: { studentId: user.id, programId: params.programId, courseId: params.courseIds }
  })

  return res.status(200).json({ message: 'Courses discarded' })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['lecturer'], res)

  program = await Program.findByPk(params.programId)
  if(!program) return res.status(404).json({ error: 'Program not found' })

  courses = await Course.findAll({
    where: { id: params.courseIds }
  })
  if(courses.length !== params.courseIds.length)
    return res.status(404).json({ error: 'Some course not found' })

  studentProgram = await StudentProgramCourse.findOne({
    where: { studentId: params.studentId, programId: params.programId }
  })
  if(!studentProgram) return res.status(404).json({ error: 'Student program not found' })
  if(studentProgram.lecturerId !== user.id) 
    return res.status(401).json({ error: 'Unauthorized' })

  studentProgramCourses = await StudentProgramCourse.findAll({
    where: { 
      studentId: params.studentId, 
      programId: params.programId, 
      courseId: params.courseIds 
    }
  })
  if(studentProgramCourses.length !== params.courseIds.length)
    return res.status(404).json({ error: 'Some course not found' })
  
  await studentProgramCourses.update({ isAccepted: params.isAccepted })

  return res.status(200).json({ message: 'Courses updated' })
}

module.exports = {
  index,
  create,
  discard,
  update
}