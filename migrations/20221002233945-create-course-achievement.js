'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CourseAchievements', {
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Courses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      achievementCode: {
        type: Sequelize.INTEGER
      },
      title: {
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
      }
    }).then(() => {
      queryInterface.addConstraint('CourseAchievements', {
        fields: ['courseId', 'achievementCode'],
        type: 'primary key',
        name: 'courseAchievement_pk'
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CourseAchievements')
  }
}