'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StudentProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentProgram.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      })
      
      StudentProgram.belongsTo(models.Program, {
        foreignKey: 'programId',
        as: 'program'
      })
      
      StudentProgram.belongsTo(models.Lecturer, {
        foreignKey: 'lecturerId',
        as: 'lecturer'
      })
      
      // student program hasmany to student program course with composite foreign key
    }
  }
  StudentProgram.init({
    status: DataTypes.STRING,
    acceptanceFile: DataTypes.STRING,
    completionFile: DataTypes.STRING,
    transcriptFile: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'StudentProgram'
  })
  
  return StudentProgram
}