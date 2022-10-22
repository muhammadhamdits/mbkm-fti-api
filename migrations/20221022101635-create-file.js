'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      objectName: {
        type: Sequelize.STRING
      },
      objectId: {
        type: Sequelize.STRING
      },
      objectField: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addConstraint('Files', {
        fields: ['objectName', 'objectId', 'objectField'],
        type: 'unique',
        name: 'unique_objectName_objectId_objectField'
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Files')
  }
}