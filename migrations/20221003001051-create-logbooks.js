'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      startsAt: {
        type: Sequelize.DATE
      },
      endsAt: {
        type: Sequelize.DATE
      },
      description: {
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
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CourseAchievements',
          key: 'courseId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      achievementCode: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CourseAchievements',
          key: 'achievementCode'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentProgram',
          key: 'studentId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      programId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentProgram',
          key: 'programId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Logbooks')
  }
}