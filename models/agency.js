'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Agency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agency.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: DataTypes.STRING,
    webUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    field: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Agency',
  })

  return Agency
}