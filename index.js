const cors = require('cors')
const express = require('express')
const routes = require('./routes')

require('dotenv').config()

const app = express()

app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes(app)

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`)
})