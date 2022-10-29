const Program = require('../models').Program
const Admin = require('../models').Admin
const Notification = require('../models').Notification
const StudentProgram = require('../models').StudentProgram
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  user = req.decoded

  if(user.role === 'student') whereParams = { studentId: user.id }
  else if(user.role === 'lecturer') whereParams = { lecturerId: user.id }
  else whereParams = {}

  studentPrograms = await StudentProgram.findAll({
    where: whereParams,
    include: ['program', 'student', 'lecturer']
  })

  return res.status(200).json({ studentPrograms })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student'], res)

  program = await Program.findByPk(params.programId)
  if (!program) return res.status(404).json({ message: 'Program not found' })

  studentProgram = await StudentProgram.create({
    studentId: user.id,
    programId: params.programId
  })

  let records = []
  adminIds = await Admin.findAll({ attributes: ['id'] })
  adminIds = adminIds.map(admin => admin.id)
  adminIds.forEach(adminId => {
    records.push({
      userId: adminId,
      userRole: 'admin',
      title: 'Pendaftar baru',
      message: `Mahasiswa ${user.name} mendaftar di program ${program.name}`,
      path: '/student-programs'
    })
  })
  await Notification.bulkCreate(records)

  return res.status(200).json({ studentProgram })
}

const show = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  const auth = authorizeUser(user, ['student', 'admin', 'lecturer'], res)
  if(auth && auth.status) return auth

  if(user.role === 'student') studentId = user.id
  else studentId = params.studentId

  studentProgram = await StudentProgram.findOne({
    where: { 
      programId: params.programId,
      studentId
    },
    include: [
      {
        model: Program,
        as: 'program',
        include: ['courses']
      },
      'lecturer'
    ]
  })

  if (!studentProgram) return res.status(404).json({ message: 'Student program not found' })
  else return res.status(200).json({ studentProgram })
}

const update = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  authorizeUser(user, ['student', 'admin'], res)

  if(user.role === 'student') studentId = user.id
  else studentId = params.studentId

  studentProgram = await StudentProgram.findOne({
    where: {
      studentId,
      programId: params.programId
    }
  })
  if (!studentProgram) 
    return res.status(404).json({ message: 'Student program not found' })
  
  studentProgram = await studentProgram.update(params)

  let records = []
  if(user.role === 'admin'){
    program = await Program.findByPk(params.programId)
    if(params.status){
      records.push({
        userId: studentId,
        userRole: 'student',
        title: 'Status program',
        message: `Pendaftaran program ${program.name} telah ${params.status === 'approved' ? 'diterima' : 'ditolak'}`,
        path: `/my-programs/${params.programId}`
      })
    } else if(params.lecturerId){
      records.push({
        userId: studentId,
        userRole: 'student',
        title: 'Dosen pembimbing',
        message: `Dosen pembimbing program ${program.name} telah ditetapkan`,
        path: `/my-programs/${params.programId}`
      })
    }
  }
  await Notification.bulkCreate(records)

  return res.status(200).json({ studentProgram })
}

module.exports = {
  index,
  create,
  show,
  update
}