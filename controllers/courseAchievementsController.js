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

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  course = await Course.findByPk(params.courseId)
  if (!course) res.status(404).json({ error: 'Course not found' })

  achievement = await CourseAchievement.create(params)

  return res.status(201).json({ achievement })
}

const update = async (req, res) => {
  const params = req.matchedData
  const user = req.decoded

  authorizeUser(user, ['admin'], res)

  const courseId = params.courseId
  const titles = params.titles
  const achievementCodes = params.achievementCodes
  const buildData = achievementCodes.map((achievementCode, index) => {
    return {
      achievementCode,
      title: titles[index],
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

const destroy = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  achievement = await CourseAchievement.findOne({
    where: {
      courseId: params.courseId,
      achievementCode: params.achievementCode
    }
  })
  if (!achievement) res.status(404).json({ error: 'Achievement not found' })

  achievement.destroy()

  return res.status(200).json({ message: 'Achievement deleted' })
}

module.exports = {
  index,
  create,
  update,
  destroy
}