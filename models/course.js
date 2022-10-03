'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsToMany(models.Program, {
        through: 'ProgramCourse',
        as: 'programs',
        foreignKey: 'courseId'
      })

      Course.hasMany(models.CourseAchievement, {
        foreignKey: 'courseId',
        as: 'achievements'
      })
    }
  }
  Course.init({
    name: DataTypes.STRING,
    sks: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Course',
  })

  return Course
}