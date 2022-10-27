'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Logbooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Logbooks.hasMany(models.Comment, {
        foreignKey: 'logbookId',
        as: 'comments'
      })

      Logbooks.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student'
      })

      Logbooks.belongsTo(models.Program, {
        foreignKey: 'programId',
        as: 'program'
      })

      Logbooks.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course'
      })
    }
  }
  Logbooks.init({
    title: DataTypes.STRING,
    startsAt: DataTypes.DATE,
    endsAt: DataTypes.DATE,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    achievementCode: DataTypes.STRING,
    reason: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Logbooks',
  })

  return Logbooks
}