module.exports = (app) => {
  const { Router } = require('express')
  const router = new Router()
  const authController = require('./controllers/authController')
  const agenciesController = require('./controllers/agenciesController')

  const validate = require('./validation/validate')
  const loginValidation = require('./validation/auths/loginValidation')
  const fetchUserValidation = require('./validation/auths/fetchUserValidation')
  const bulkUpsertStudentValidation = require('./validation/auths/bulkUpsertStudentValidation')
  const bulkUpsertLecturerValidation = require('./validation/auths/bulkUpsertLecturerValidation')

  const getAgenciesValidation = require('./validation/agencies/getAgenciesValidation')
  const createAgenciesValidation = require('./validation/agencies/createAgenciesValidation')
  const updateAgenciesValidation = require('./validation/agencies/updateAgenciesValidation')
  const deleteAgenciesValidation = require('./validation/agencies/deleteAgenciesValidation')

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

  router.get('/agencies',
    validate(getAgenciesValidation),
    agenciesController.index
  )
  router.post('/agencies',
    validate(createAgenciesValidation),
    agenciesController.create
  )
  router.put('/agencies/:id',
    validate(updateAgenciesValidation),
    agenciesController.update
  )
  router.delete('/agencies/:id',
    validate(deleteAgenciesValidation),
    agenciesController.destroy
  )
  
  app.use('/api', router)
}