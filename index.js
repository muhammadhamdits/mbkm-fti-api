const cors = require('cors')
const express = require('express')
const routes = require('./routes')
const authMiddleware = require('./middlewares/authMiddleware')

require('dotenv').config()

const app = express()

app.use('/uploads',
  authMiddleware,
  (req, res, next) => {
    user = req.decoded
    path = req.path
    filename = path.split('/').pop()
    if (user.role === 'student') {
      if (filename.includes('student') && filename.includes(user.id)) next()
      else res.status(401).json({ message: 'Unauthorized' })
    } else next()
  }
)
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes(app)

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`)
})