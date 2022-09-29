const Course = require('../models').Course
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  courses = await Course.findAll({where: params })

  return res.status(200).json({ courses })
}

module.exports = {
  index
}