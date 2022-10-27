'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Logbooks, { 
        foreignKey: 'logbookId',
        as: 'logbook'
      })
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    isLecturer: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Comment',
  })

  return Comment
}