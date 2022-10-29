const Course = require('../models').Course
const CourseAchievement = require('../models').CourseAchievement
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  courseAchievements = await CourseAchievement.findAll({ where: params })

  if (!courseAchievements) res.status(404).json({ error: 'Course not found' })

  return res.status(200).json({ achievements: courseAchievements })
}

const update = async (req, res) => {
  const params = req.matchedData
  const user = req.decoded

  authorizeUser(user, ['admin'], res)

  const courseId = params.courseId
  const titles = params.titles
  const weights = params.weights
  const achievementCodes = params.achievementCodes
  const buildData = achievementCodes.map((achievementCode, index) => {
    return {
      achievementCode,
      title: titles[index],
      weight: weights[index],
      courseId,
      deletedAt: null
    }
  })

  allCourseAchievements = await CourseAchievement.findAll({ where: { courseId } })
  allCourseAchievementCodes = allCourseAchievements.map(ca => ca.achievementCode)
  notInNewAchievements = allCourseAchievementCodes.filter(ac => !achievementCodes.includes(ac))

  await CourseAchievement.destroy({ where: {
    courseId,
    achievementCode: notInNewAchievements
  }})

  await CourseAchievement.bulkCreate(buildData, { updateOnDuplicate: ['title', 'deletedAt'] })
  
  return res.status(200).json({ message: 'Achievement updated' })
}

module.exports = {
  index,
  update,
}