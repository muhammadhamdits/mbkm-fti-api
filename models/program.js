'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Program.belongsTo(models.Agency, {
        foreignKey: 'agencyId',
        as: 'agency'
      })
      
      Program.belongsTo(models.ProgramType, {
        foreignKey: 'programTypeId',
        as: 'programType'
      })
    }
  }
  Program.init({
    name: DataTypes.STRING,
    isCertified: DataTypes.BOOLEAN,
    isRemote: DataTypes.BOOLEAN,
    startsAt: DataTypes.DATE,
    endsAt: DataTypes.DATE,
    openAt: DataTypes.DATE,
    closeAt: DataTypes.DATE,
    description: DataTypes.STRING,
    minTerms: DataTypes.INTEGER,
    sksCount: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Program',
  })

  return Program
}