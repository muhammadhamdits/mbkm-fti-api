'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CourseAchievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CourseAchievement.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course'
      })
    }
  }
  CourseAchievement.init({
    achievementCode: DataTypes.STRING,
    title: DataTypes.STRING,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'CourseAchievement',
  })
  CourseAchievement.removeAttribute('id')

  return CourseAchievement
}