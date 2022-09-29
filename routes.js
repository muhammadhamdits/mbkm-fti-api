module.exports = (app) => {
  const { Router } = require('express')
  const router = new Router()
  const authController = require('./controllers/authController')
  const agenciesController = require('./controllers/agenciesController')
  const programTypesController = require('./controllers/programTypesController')
  const programsController = require('./controllers/programsController')
  
  const validate = require('./validation/validate')
  const loginValidation = require('./validation/auths/loginValidation')
  const fetchUserValidation = require('./validation/auths/fetchUserValidation')
  const bulkUpsertStudentValidation = require('./validation/auths/bulkUpsertStudentValidation')
  const bulkUpsertLecturerValidation = require('./validation/auths/bulkUpsertLecturerValidation')

  const getAgenciesValidation = require('./validation/agencies/getAgenciesValidation')
  const createAgenciesValidation = require('./validation/agencies/createAgenciesValidation')
  const updateAgenciesValidation = require('./validation/agencies/updateAgenciesValidation')
  const deleteAgenciesValidation = require('./validation/agencies/deleteAgenciesValidation')
  
  const getProgramTypesValidation = require('./validation/programTypes/getProgramTypesValidation')
  const createProgramTypesValidation = require('./validation/programTypes/createProgramTypesValidation')
  const updateProgramTypesValidation = require('./validation/programTypes/updateProgramTypesValidation')
  const deleteProgramTypesValidation = require('./validation/programTypes/deleteProgramTypesValidation')

  const getProgramsValidation = require('./validation/programs/getProgramsValidation')
  const createProgramsValidation = require('./validation/programs/createProgramsValidation')
  const updateProgramsValidation = require('./validation/programs/updateProgramsValidation')
  const deleteProgramsValidation = require('./validation/programs/deleteProgramsValidation')

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

  router.get('/program-types',
    validate(getProgramTypesValidation),
    programTypesController.index
  )
  router.post('/program-types',
    validate(createProgramTypesValidation),
    programTypesController.create
  )
  router.put('/program-types/:id',
    validate(updateProgramTypesValidation),
    programTypesController.update
  )
  router.delete('/program-types/:id',
    validate(deleteProgramTypesValidation),
    programTypesController.destroy
  )

  router.get('/programs',
    validate(getProgramsValidation),
    programsController.index
  )
  router.post('/programs',
    validate(createProgramsValidation),
    programsController.create
  )
  router.put('/programs/:id',
    validate(updateProgramsValidation),
    programsController.update
  )
  router.delete('/programs/:id',
    validate(deleteProgramsValidation),
    programsController.destroy
  )
  
  app.use('/api', router)
}