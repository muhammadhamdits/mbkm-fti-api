const StudentProgramCourseAchievement = require('../models').StudentProgramCourseAchievement
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  if(user.role == 'student') params.studentId = user.id
  
  studentProgramCourseAchievements = await StudentProgramCourseAchievement.findAll({where: params })

  return res.status(200).json({ studentProgramCourseAchievements })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['lecturer'], res)

  studentProgramCourseAchievement = await StudentProgramCourseAchievement.findOne({where: params })
  if(!studentProgramCourseAchievement) 
    return res.status(404).json({ message: 'StudentProgramCourseAchievement not found' })

  studentProgram = await StudentProgram.findOne({where: { 
    studentId: params.studentId,
    programId: params.programId 
  } })
  if(studentProgram.lecturerId != user.id)
    return res.status(403).json({ message: 'You are not authorized to update this StudentProgramCourseAchievement' })

    studentProgramCourseAchievement.update(params)

  return res.status(200).json({ studentProgramCourseAchievement })
}

module.exports = {
  index,
  update
}