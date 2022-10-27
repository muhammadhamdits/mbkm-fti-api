const Logbook = require('../models').Logbooks
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
    }
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
    include: ['comments']
  })
  if(!logbook) return res.status(404).json({ error: 'No logbook found with id provided' })

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

  return res.status(200).json({ logbook })
}

module.exports = {
  index,
  create,
  show,
  update
}