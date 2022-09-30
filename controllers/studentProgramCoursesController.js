const StudentProgramCourse = require('../models').StudentProgramCourse
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

module.exports = {
  index
}