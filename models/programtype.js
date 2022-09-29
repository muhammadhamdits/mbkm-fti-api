'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProgramType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProgramType.hasMany(models.Program, {
        foreignKey: 'programTypeId',
        as: 'programs'
      })
    }
  }
  ProgramType.init({
    name: DataTypes.STRING(50),
    description: DataTypes.STRING(255)
  }, {
    sequelize,
    paranoid: true,
    modelName: 'ProgramType',
  })
  
  return ProgramType
}