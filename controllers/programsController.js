const Program = require('../models').Program
const Agency = require('../models').Agency
const ProgramType = require('../models').ProgramType
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  programs = await Program.findAll({ 
    where: params, 
    include: ['agency', 'programType'] 
  })

  return res.status(200).json({ programs })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded
  
  authorizeUser(user, ['admin'], res)

  agency = await Agency.findByPk(params.agencyId)
  if (!agency) return res.status(404).json({ message: 'Agency not found' })

  programType = await ProgramType.findByPk(params.programTypeId)
  if (!programType) return res.status(404).json({ message: 'Program type not found' })

  program = await Program.create(params)

  return res.status(200).json({ program })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  program = await Program.findByPk(params.id)
  if (!program) return res.status(404).json({ message: 'Program not found' })

  if(params.agencyId) {
    agency = await Agency.findByPk(params.agencyId)
    if (!agency) return res.status(404).json({ message: 'Agency not found' })
  }

  if(params.programTypeId) {
    programType = await ProgramType.findByPk(params.programTypeId)
    if (!programType) return res.status(404).json({ message: 'Program type not found' })
  }

  await program.update(params)

  return res.status(200).json({ program })
}

const destroy = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['admin'], res)

  program = await Program.findByPk(params.id)
  if (!program) return res.status(404).json({ message: 'Program not found' })

  await program.destroy()

  return res.status(200).json({ message: 'Program deleted' })
}

module.exports = {
  index,
  create,
  update,
  destroy
}