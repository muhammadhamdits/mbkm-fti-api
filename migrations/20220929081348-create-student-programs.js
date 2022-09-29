'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentPrograms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      acceptanceFile: {
        type: Sequelize.STRING
      },
      completionFile: {
        type: Sequelize.STRING
      },
      transcriptFile: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleteAt: {
        type: Sequelize.DATE
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Students',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      programId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Programs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      lecturerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lecturers',
          key: 'id'
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }).then(() => {
      queryInterface.addIndex('StudentPrograms', ['studentId', 'programId'], {
        unique: true
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentPrograms')
  }
}