const StudentProgramCourse = require('../models').StudentProgramCourse
const StudentProgram = require('../models').StudentProgram
const Program = require('../models').Program
const Course = require('../models').Course
const CourseAchievement = require('../models').CourseAchievement
const { authorizeUser } = require('./authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student', 'admin', 'lecturer'], res)

  if(user.role === 'student') params.studentId = user.id

  cpmks = await CourseAchievement.findAll()
  
  studentProgramCourses = await StudentProgramCourse.findAll({
    where: params,
    include: ['course']
  })

  totalSks = 0
  studentProgramCourses = studentProgramCourses.map(studentProgramCourse => {
    totalSks += studentProgramCourse.course.sks
    studentProgramCourse = studentProgramCourse.toJSON()
    studentProgramCourse.course.cpmks = cpmks.map(cpmk => {
      if(cpmk.courseId === studentProgramCourse.course.id) return cpmk
    })
    studentProgramCourse.course.cpmks = studentProgramCourse.course.cpmks.filter(cpmk => cpmk)
    return studentProgramCourse
  })

  return res.status(200).json({ studentProgramCourses, totalSks })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student'], res)

  program = await Program.findByPk(params.programId, { include: ['courses'] })
  if(!program) return res.status(404).json({ error: 'Program not found' })
  
  studentProgram = await StudentProgram.findOne({ programId: params.programId, studentId: user.id })
  if(!studentProgram) return res.status(404).json({ error: 'Student program not found' })

  courses = await Course.findAll({
    where: { id: params.courseIds }
  })
  if(courses.length !== params.courseIds.length) 
    return res.status(404).json({ error: 'Some course not found' })

  availableCourses = program.courses
  if(!availableCourses) return res.status(404).json({ error: 'No courses available' })

  availableCourseIds = availableCourses.map(course => course.id)
  if(!params.courseIds.every(courseId => availableCourseIds.includes(courseId)))
    return res.status(404).json({ error: 'Some course not available' })

  currentSks = 0
  currentSPC = await StudentProgramCourse.findAll({
    where: { studentId: user.id, programId: params.programId },
    include: ['course']
  })
  currentSPC.forEach(spc => currentSks += spc.course.sks)

  totalSks = currentSks
  records = courses.map(course => {
    totalSks += course.sks

    return {
      courseId: course.id,
      studentId: user.id,
      programId: params.programId,
      deletedAt: null
    }
  })
  
  exceedErrMsg = 'Total SKS exceeds the limit'
  if(totalSks > program.sksCount) return res.status(400).json({ error: exceedErrMsg })

  studentProgramCourses = await StudentProgramCourse.bulkCreate(records,
    { updateOnDuplicate: ['deletedAt', 'updatedAt'] }
  )

  return res.status(200).json({ studentProgramCourses })
}

const discard = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student'], res)

  program = await Program.findByPk(params.programId)
  if(!program) return res.status(404).json({ error: 'Program not found' })

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

  studentProgram = await StudentProgram.findOne({
    where: { studentId: params.studentId, programId: params.programId }
  })
  if(!studentProgram) return res.status(404).json({ error: 'Student program not found' })
  if(studentProgram.lecturerId !== user.id) 
    return res.status(401).json({ error: 'Unauthorized' })

  const whereParams = { 
    studentId: params.studentId, 
    programId: params.programId, 
    courseId: params.courseIds 
  }
  studentProgramCourses = await StudentProgramCourse.findAll({
    where: whereParams
  })
  if(studentProgramCourses.length !== params.courseIds.length)
    return res.status(404).json({ error: 'Some course not found' })
  
  await StudentProgramCourse.update({ status: params.status }, { where: whereParams })

  return res.status(200).json({ message: 'Courses updated' })
}

module.exports = {
  index,
  create,
  discard,
  update
}