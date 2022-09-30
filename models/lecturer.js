'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lecturer.hasMany(models.StudentProgram, {
        foreignKey: 'lecturerId',
        as: 'studentPrograms'
      })
    }
  }
  Lecturer.init({
    name: DataTypes.STRING,
    nip: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Lecturer',
  })

  Lecturer.beforeCreate(async (params) => {
    const salt = await bcrypt.genSalt()
    params.password = await bcrypt.hash(params.password, salt)
  })

  return Lecturer
}