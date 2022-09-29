'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProgramCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProgramCourse.belongsTo(models.Program, { 
        foreignKey: 'programId',
        as: 'program'
      })

      ProgramCourse.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course'
      })
    }
  }
  ProgramCourse.init({
    deleteAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'ProgramCourse',
  })

  return ProgramCourse
}