'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StudentPrograms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentPrograms.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      })
      
      StudentPrograms.belongsTo(models.Program, {
        foreignKey: 'programId',
        as: 'program'
      })
      
      StudentPrograms.belongsTo(models.Lecturer, {
        foreignKey: 'lecturerId',
        as: 'lecturer'
      })
    }
  }
  StudentPrograms.init({
    status: DataTypes.STRING,
    acceptanceFile: DataTypes.STRING,
    completionFile: DataTypes.STRING,
    transcriptFile: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'StudentPrograms',
    indexes: [
      {
        unique: true,
        fields: ['studentId', 'programId']
      }
    ]
  })
  return StudentPrograms
}