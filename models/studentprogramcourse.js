'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StudentProgramCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentProgramCourse.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course'
      })

      StudentProgramCourse.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      })

      StudentProgramCourse.belongsTo(models.Program, {
        foreignKey: 'programId',
        as: 'program'
      })
    }
  }
  StudentProgramCourse.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'StudentProgramCourse'
  })
  StudentProgramCourse.removeAttribute('id')

  return StudentProgramCourse
}