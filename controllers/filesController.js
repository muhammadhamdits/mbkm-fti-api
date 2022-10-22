const formidable = require('formidable')
const mv = require('mv')
const fs = require('fs')
const Models = require('../models')
const File = Models.File
const { authorizeUser } = require('../controllers/authController')

const upload = async (req, res) => {
  params = req.matchedData
  user = req.decoded
  const { objectName, objectId, objectField } = params

  // check auth later

  oldFile = await checkFile(params)
  if (oldFile) unlinkFile(oldFile)

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    const oldPath = files.file.filepath
    const extension = files.file.originalFilename.split('.').pop()
    const newName = `${user.id}-${files.file.newFilename}.${extension}`
    const newPath = `${__dirname}/../public/uploads/${newName}`
    mv(oldPath, newPath, async (err) => {
      if (err) res.status(500).json({ error: err })
      else {
        fileUrl = `${process.env.BASE_URL}:${process.env.SERVER_PORT}/uploads/${newName}`
        await setFile(params, newPath)
        await updateObjectField(params, fileUrl)
        res.status(200).json({ message: 'File uploaded' })
      }
    })
  })
}

// private

const setFile = async (params, path) => {
  const { objectName, objectId, objectField } = params
  const file = await File.findOne({ where: { objectName, objectId, objectField } })
  if (file) file.update({ path })
  else File.create({ objectName, objectId, objectField, path })
}

const checkFile = async (params) => {
  const { objectName, objectId, objectField } = params
  const file = await File.findOne({ where: { objectName, objectId, objectField } })
  if (file) return file.path
  else return null
}

const unlinkFile = async (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err
  })
}

const updateObjectField = async (params, fileUrl) => {
  const { objectName, objectId, objectField } = params
  const objectModel = classMap[objectName]
  whereParams = JSON.parse(objectId)
  const object = await objectModel.findOne({ where: whereParams })
  if (object) object.update({ [objectField]: fileUrl })
}

const classMap = {
  'StudentProgram': Models.StudentProgram
}

module.exports = {
  upload
}