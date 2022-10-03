const Course = require('../models').Course
const CourseAchievement = require('../models').CourseAchievement
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  course = await Course.findByPk(params.courseId, {
    include: [
      {
        association: 'achievements',
        attributes: ['achievementCode', 'title']
      }
    ]
  })

  if (!course) res.status(404).json({ error: 'Course not found' })

  return res.status(200).json({ achievements: course.achievements })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, 'admin', res)

  course = await Course.findByPk(params.courseId)
  if (!course) res.status(404).json({ error: 'Course not found' })

  achievement = await CourseAchievement.create(params)

  return res.status(201).json({ achievement })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, 'admin', res)

  achievement = await CourseAchievement.findOne({
    where: {
      courseId: params.courseId,
      achievementCode: params.achievementCode
    }
  })
  if (!achievement) res.status(404).json({ error: 'Achievement not found' })

  achievement.update(params)

  return res.status(200).json({ achievement })
}

const destroy = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, 'admin', res)

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