'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Programs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      isCertified: {
        type: Sequelize.BOOLEAN
      },
      isRemote: {
        type: Sequelize.BOOLEAN
      },
      startsAt: {
        type: Sequelize.DATE
      },
      endsAt: {
        type: Sequelize.DATE
      },
      openAt: {
        type: Sequelize.DATE
      },
      closeAt: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      minTerms: {
        type: Sequelize.INTEGER
      },
      sksCount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Programs');
  }
};