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

  scores = params.scores
  achievementCodes = params.achievementCodes
  whereParams = {
    studentId: params.studentId,
    programId: params.programId,
    courseId: params.courseId,
    achievementCode: achievementCodes
  }
  studentProgramCourseAchievements = await StudentProgramCourseAchievement.findAll({ where: whereParams })

  if(studentProgramCourseAchievements.length !== params.achievementCodes.length)
    return res.status(404).json({ message: 'Some achievement not found' })

  records = achievementCodes.map((achievementCode, index) => {
    return {
      studentId: params.studentId,
      programId: params.programId,
      courseId: params.courseId,
      achievementCode,
      score: scores[index]
    }
  })

  await StudentProgramCourseAchievement.bulkCreate(records, { updateOnDuplicate: ['score', 'updatedAt'] })

  return res.status(200).json({ message: 'Scores updated' })
}

module.exports = {
  index,
  update
}