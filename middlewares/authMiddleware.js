const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if(req.path == '/api/login') return next()
  
  authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).json({ message: 'No token provided' })

  const token = authHeader.split(' ')[1]
  if(!token) return res.status(401).json({ message: 'No token provided' })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(401).json({ message: 'Failed to authenticate token' })

    req.decoded = decoded
    next()
  })
}