'use strict'
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
      placement: {
        type: Sequelize.STRING
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
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      agencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Agencies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      programTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ProgramTypes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Programs')
  }
}