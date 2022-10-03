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
      Logbooks.belongsTo(models.CourseAchievement, {
        foreignKey: 'achievementCode',
        as: 'achievement'
      })

      Logbooks.belongsTo(models.StudentProgram, {
        foreignKey: 'studentId',
        as: 'studentProgram'
      })
    }
  }
  Logbooks.init({
    title: DataTypes.STRING,
    startsAt: DataTypes.DATE,
    endsAt: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Logbooks',
  })

  return Logbooks
}