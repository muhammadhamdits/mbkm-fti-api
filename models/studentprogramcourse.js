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
      // Add associations here
    }
  }
  StudentProgramCourse.init({
    isAccepted: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid: true,
    modelName: 'StudentProgramCourse'
  })

  return StudentProgramCourse
}