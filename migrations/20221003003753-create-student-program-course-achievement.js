'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentProgramCourseAchievements', {
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentPrograms',
          key: 'studentId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      programId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentPrograms',
          key: 'programId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
        type: Sequelize.STRING
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