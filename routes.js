module.exports = (app) => {
  const { Router } = require('express')
  const router = new Router()
  const authController = require('./controllers/authController')

  const validate = require('./validation/validate')
  const loginValidation = require('./validation/loginValidation')
  const fetchUserValidation = require('./validation/fetchUserValidation')
  const authMiddleware = require('./middlewares/authMiddleware')

  router.post('/login',
  validate(loginValidation),
  authController.login
  )

  router.use(authMiddleware)
  
  router.put('/fetch-users/:type',
  validate(fetchUserValidation),
  authController.fetchUser
  )
  
  app.use('/api', router)
}