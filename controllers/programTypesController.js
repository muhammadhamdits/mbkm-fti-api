const ProgramType = require('../models').ProgramType
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  programTypes = await ProgramType.findAll({where: params })

  return res.status(200).json({ programTypes })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  programType = await ProgramType.create(params)

  return res.status(200).json({ programType })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  programType = await ProgramType.findByPk(params.id)
  if (!programType) return res.status(404).json({ message: 'Program type not found' })
  programType = await programType.update(params)

  return res.status(200).json({ programType })
}

const destroy = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  programType = await ProgramType.findByPk(params.id)
  if (!programType) return res.status(404).json({ message: 'Program type not found' })
  await programType.destroy()

  return res.status(200).json({ programType })
}

module.exports = {
  index,
  create,
  update,
  destroy
}