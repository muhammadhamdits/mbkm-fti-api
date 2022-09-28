'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Admin',
  })

  Admin.beforeCreate(async (params) => {
    const salt = await bcrypt.genSalt()
    params.password = await bcrypt.hash(params.password, salt)
  })

  return Admin
}