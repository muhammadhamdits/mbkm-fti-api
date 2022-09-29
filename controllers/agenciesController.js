const Agency = require('../models').Agency
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  agencies = await Agency.findAll({where: params })

  return res.status(200).json({ agencies })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  agency = await Agency.create(params)

  return res.status(200).json({ agency })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  agency = await Agency.findByPk(params.id)
  if (!agency) return res.status(404).json({ message: 'Agency not found' })
  agency = await agency.update(params)

  return res.status(200).json({ agency })
}

const destroy = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  agency = await Agency.findByPk(params.id)
  if (!agency) return res.status(404).json({ message: 'Agency not found' })
  await agency.destroy()

  return res.status(200).json({ agency })
}

module.exports = {
  index,
  create,
  update,
  destroy
}