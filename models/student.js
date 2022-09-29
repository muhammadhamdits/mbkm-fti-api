'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    name: DataTypes.STRING,
    nim: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Student',
  })

  Student.beforeCreate(async (params) => {
    const salt = await bcrypt.genSalt()
    params.password = await bcrypt.hash(params.password, salt)
  })

  return Student
}