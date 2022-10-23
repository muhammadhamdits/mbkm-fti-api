const cors = require('cors')
const express = require('express')
const routes = require('./routes')
const authGet = require('./middlewares/authGet')

require('dotenv').config()

const app = express()

app.use('/uploads',
  authGet,
  (req, res, next) => {
    user = req.decoded
    path = req.path
    filename = path.split('/').pop()
    format = filename.split('-')
    if (user.role == 'student') {
      if (user.id == format[0] && user.role == format[1]) next()
      else res.status(403).json({ message: 'Forbidden' })
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