'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentProgramCourseAchievements', {
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
      },
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CourseAchievement',
          key: 'courseId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      achievementCode: {
        type: Sequelize.STRING,
        references: {
          model: 'CourseAchievement',
          key: 'achievementCode'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      score: {
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
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addConstraint('StudentProgramCourseAchievements', {
        fields: ['studentId', 'programId', 'courseId', 'achievementCode'],
        type: 'primary key',
        name: 'StudentProgramCourseAchievements_pk'
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentProgramCourseAchievements')
  }
}