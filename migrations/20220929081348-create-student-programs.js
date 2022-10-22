'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentPrograms', {
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Students',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      programId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Programs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      status: {
        type: Sequelize.STRING
      },
      advisorRecommendationFile: {
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
      deletedAt: {
        type: Sequelize.DATE
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
      queryInterface.addConstraint('StudentPrograms', {
        fields: ['studentId', 'programId'],
        type: 'primary key',
        name: 'student_program_pk'
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentPrograms')
  }
}