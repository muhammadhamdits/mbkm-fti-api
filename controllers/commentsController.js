const Logbook = require('../models').Logbooks
const Comment = require('../models').Comment
const StudentProgram = require('../models').StudentProgram
const { authorizeUser } = require('../controllers/authController')

const index = async (req, res) => {
  params = req.matcedData
  user = req.decoded

  if(user.role == 'student') params.studentId = user.id

  logbook = await Logbook.findByPk(params.logbookId)
  if (!logbook) return res.status(404).json({ message: 'Logbook not found' })

  studentProgram = await StudentProgram.findOne({ where: { 
    studentId: logbook.studentId,
    programId: logbook.programId
  }})

  if(user.role == 'student'){
    if(studentProgram.studentId != user.id) 
    return res.status(200).json([])
  }
  else if(user.role == 'lecturer'){
    if(studentProgram.lecturerId != user.id)
    return res.status(200).json([])
  }
   
  comments = await Comment.findAll({where: params })

  return res.status(200).json({ comments })
}

const create = async (req, res) => {
  params = req.matchedData
  user = req.decoded

  logbook = await Logbook.findByPk(params.logbookId)
  if (!logbook) return res.status(404).json({ message: 'Logbook not found' })

  studentProgram = await StudentProgram.findOne({ where: {
    studentId: logbook.studentId,
    programId: logbook.programId
  }})

  if(user.role == 'student'){
    if(studentProgram.studentId != user.id)
    return res.status(403).json({ message: 'You are not authorized to perform this action' })
  } else if(user.role == 'lecturer'){
    if(studentProgram.lecturerId != user.id)
      return res.status(403).json({ message: 'You are not authorized to perform this action' })
    else params.isLecturer = true
  }

  comment = await Comment.create(params)

  return res.status(201).json({ comment })
}

module.exports = {
  index,
  create
}