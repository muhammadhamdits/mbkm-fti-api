const Logbook = require('../models').Logbooks
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student', 'lecturer', 'admin'], res)
  if(user.role === 'student') studentId = user.id
  else studentId = params.studentId

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

module.exports = {
  index,
  create
}