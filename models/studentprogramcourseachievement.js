'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StudentProgramCourseAchievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentProgramCourseAchievement.belongsTo(models.Student,
        { foreignKey: 'studentId', as: 'student' }
      )
      
      StudentProgramCourseAchievement.belongsTo(models.Program,
        { foreignKey: 'programId', as: 'program' }
      )
      
      StudentProgramCourseAchievement.belongsTo(models.Course,
        { foreignKey: 'courseId', as: 'course' }
      )
    }
  }
  StudentProgramCourseAchievement.init({
    score: DataTypes.INTEGER,
    achievementCode: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'StudentProgramCourseAchievement',
  })
  StudentProgramCourseAchievement.removeAttribute('id')
  
  return StudentProgramCourseAchievement
}