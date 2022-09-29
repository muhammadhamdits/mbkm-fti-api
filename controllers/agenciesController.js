const Agency = require('../models').Agency
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  agencies = await Agency.findAll({where: params })

  return res.status(200).json({ agencies })
}

module.exports = {
  index
}