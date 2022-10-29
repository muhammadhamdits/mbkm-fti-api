module.exports = (app) => {
  const { Router } = require('express')
  const router = new Router()
  const authController = require('./controllers/authController')
  const agenciesController = require('./controllers/agenciesController')
  const programTypesController = require('./controllers/programTypesController')
  const programsController = require('./controllers/programsController')
  const coursesController = require('./controllers/coursesController')
  const studentProgramsController = require('./controllers/studentProgramsController')
  const studentProgramCoursesController = require('./controllers/studentProgramCoursesController')
  const courseAchievementsController = require('./controllers/courseAchievementsController')
  const logbooksController = require('./controllers/logbooksController')
  const studentProgramCourseAchievementsController = require('./controllers/studentProgramCourseAchievementsController')
  const commentsController = require('./controllers/commentsController')
  const filesController = require('./controllers/filesController')
  const usersController = require('./controllers/usersController')
  const notificationsController = require('./controllers/notificationsController')
  
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
  const showProgramsValidation = require('./validation/programs/showProgramsValidation')
  const createProgramsValidation = require('./validation/programs/createProgramsValidation')
  const updateProgramsValidation = require('./validation/programs/updateProgramsValidation')
  const deleteProgramsValidation = require('./validation/programs/deleteProgramsValidation')

  const getCoursesValidation = require('./validation/courses/getCoursesValidation')

  const getCourseAchievementsValidation = require('./validation/courseAchievements/getCourseAchievementsValidation')
  const updateCourseAchievementsValidation = require('./validation/courseAchievements/updateCourseAchievementsValidation')

  const setProgramCourseValidation = require('./validation/programCourses/setProgramCourseValidation')

  const createStudentProgramValidation = require('./validation/studentPrograms/createStudentProgramValidation')
  const updateStudentProgramValidation = require('./validation/studentPrograms/updateStudentProgramValidation')
  const showStudentProgramValidation = require('./validation/studentPrograms/showStudentProgramValidation')
  const assignStudentProgramLecturerValidation = require('./validation/studentPrograms/assignStudentProgramLecturerValidation')
  const updateStudentProgramStatusValidation = require('./validation/studentPrograms/updateStudentProgramStatusValidation')

  const getStudentProgramCoursesValidation = require('./validation/studentProgramCourses/getStudentProgramCoursesValidation')
  const studentProgramCoursesValidation = require('./validation/studentProgramCourses/studentProgramCoursesValidation')
  const updateStudentProgramCoursesValidation = require('./validation/studentProgramCourses/updateStudentProgramCoursesValidation')

  const getLogbooksValidation = require('./validation/logbooks/getLogbooksValidation')
  const createLogbooksValidation = require('./validation/logbooks/createLogbooksValidation')
  const showLogbooksValidation = require('./validation/logbooks/showLogbooksValidation')
  const updateLogbooksValidation = require('./validation/logbooks/updateLogbooksValidation')

  const getStudentProgramCourseAchievementsValidation = require('./validation/studentProgramCourseAchievements/getStudentProgramCourseAchievementsValidation')
  const updateStudentProgramCourseAchievementsValidation = require('./validation/studentProgramCourseAchievements/updateStudentProgramCourseAchievementsValidation')

  const getCommentsValidation = require('./validation/comments/getCommentsValidation')
  const createCommentsValidation = require('./validation/comments/createCommentsValidation')

  const uploadFilesValidation = require('./validation/files/uploadFilesValidation')

  const authMiddleware = require('./middlewares/authMiddleware')

  router.post('/login',
    validate(loginValidation),
    authController.login
  )

  router.use(authMiddleware)

  router.post('/decode',
    authController.decode
  )
  
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
  router.get('/programs/:id',
    validate(showProgramsValidation),
    programsController.show
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
  
  router.put('/programs/:programId/courses',
    validate(setProgramCourseValidation),
    programsController.setCourses
  )

  router.post('/programs/:programId/register',
    validate(createStudentProgramValidation),
    studentProgramsController.create
  )
  router.put('/programs/:programId/update',
    validate(updateStudentProgramValidation),
    studentProgramsController.update
  )

  router.get('/student-programs',
    studentProgramsController.index
  )
  router.get('/student-programs/:programId',
    validate(showStudentProgramValidation),
    studentProgramsController.show
  )
  router.put('/student-programs/lecturer',
    validate(assignStudentProgramLecturerValidation),
    studentProgramsController.update
  )
  router.put('/student-programs/status',
    validate(updateStudentProgramStatusValidation),
    studentProgramsController.update
  )

  router.get('/student-programs/:programId/courses',
    validate(getStudentProgramCoursesValidation),
    studentProgramCoursesController.index
  )
  router.post('/student-programs/:programId/courses',
    validate(studentProgramCoursesValidation),
    studentProgramCoursesController.create
  )
  router.delete('/student-programs/:programId/courses',
    validate(studentProgramCoursesValidation),
    studentProgramCoursesController.discard
  )
  router.put('/student-programs/:programId/courses',
    validate(updateStudentProgramCoursesValidation),
    studentProgramCoursesController.update
  )
  
  router.get('/logbooks/:id',
    validate(showLogbooksValidation),
    logbooksController.show
  )
  router.put('/logbooks/:id',
    validate(updateLogbooksValidation),
    logbooksController.update
  )
  router.get('/student-programs/:programId/logbooks',
    validate(getLogbooksValidation),
    logbooksController.index
  )
  router.post('/student-programs/:programId/logbooks',
    validate(createLogbooksValidation),
    logbooksController.create
  )

  router.get('/student-programs/:programId/course-achievements/:courseId',
    validate(getStudentProgramCourseAchievementsValidation),
    studentProgramCourseAchievementsController.index
  )
  router.put('/student-programs/:programId/course-achievements/:courseId',
    validate(updateStudentProgramCourseAchievementsValidation),
    studentProgramCourseAchievementsController.update
  )
  
  router.get('/courses',
    validate(getCoursesValidation),
    coursesController.index
  )

  router.get('/courses/:courseId/achievements',
    validate(getCourseAchievementsValidation),
    courseAchievementsController.index
  )
  router.put('/courses/:courseId/achievements',
    validate(updateCourseAchievementsValidation),
    courseAchievementsController.update
  )

  router.get('/logbooks/:logbookId/comments',
    validate(getCommentsValidation),
    commentsController.index
  )
  router.post('/logbooks/:logbookId/comments',
    validate(createCommentsValidation),
    commentsController.create
  )

  router.post('/upload',
    validate(uploadFilesValidation),
    filesController.upload
  )

  router.get('/lecturers', usersController.getLecturers)

  router.get('/notifications', notificationsController.index)
  router.put('/notifications/:id', notificationsController.update)

  app.use('/api', router)
}