const Logbook = require('../models').Logbooks
const CourseAchievement = require('../models').CourseAchievement
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student', 'lecturer', 'admin'], res)
  if(user.role === 'student') studentId = user.id
  else studentId = params.studentId || null

  logbooks = await Logbook.findAll({
    where: {
      studentId,
      programId: params.programId
    },
    include: ['course']
  })

  res.status(200).json({ logbooks })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student'], res)
  
  logbook = await Logbook.create({
    studentId: user.id,
    ...params
  })

  return res.status(200).json({ logbook })
}

const show = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  logbook = await Logbook.findOne({ 
    where: { id: params.id },
    include: ['comments', 'course']
  })
  if(!logbook) return res.status(404).json({ error: 'No logbook found with id provided' })

  cpmks = await CourseAchievement.findAll({ where: { courseId: logbook.courseId } })

  logbook = logbook.toJSON()
  logbook.course.cpmks = cpmks.map(cpmk => {
    if(cpmk.courseId === logbook.course.id) return cpmk
  }).filter(cpmk => cpmk)

  return res.status(200).json({ logbook })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student', 'lecturer', 'admin'], res)
  if(user.role === 'student') params.status = 'proposed'

  logbook = await Logbook.findOne({ where: { id: params.id } })
  if(!logbook) return res.status(404).json({ error: 'No logbook found with id provided' })

  logbook = await logbook.update(params)
  logbook = await Logbook.findOne({ 
    where: { id: logbook.id },
    include: ['comments', 'course']
  })
  cpmks = await CourseAchievement.findAll({ where: { courseId: logbook.courseId } })

  logbook = logbook.toJSON()
  logbook.course.cpmks = cpmks.map(cpmk => {
    if(cpmk.courseId === logbook.course.id) return cpmk
  }).filter(cpmk => cpmk)

  return res.status(200).json({ logbook })
}

module.exports = {
  index,
  create,
  show,
  update
}