module.exports = (app) => {
  const { Router } = require('express')
  const router = new Router()
  const authController = require('./controllers/authController')

  const validate = require('./validation/validate')
  const loginValidation = require('./validation/loginValidation')
  const fetchUserValidation = require('./validation/fetchUserValidation')
  const bulkUpsertStudentValidation = require('./validation/bulkUpsertStudentValidation')
  const bulkUpsertLecturerValidation = require('./validation/bulkUpsertLecturerValidation')

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
  router.post('/bulk-upsert/students',
    validate(bulkUpsertStudentValidation),
    authController.bulkUpsertStudent
  )
  router.post('/bulk-upsert/lecturers',
    validate(bulkUpsertLecturerValidation),
    authController.bulkUpsertLecturer
  )
  
  app.use('/api', router)
}