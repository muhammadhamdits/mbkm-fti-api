'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProgramCourses', {
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
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Courses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
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
      queryInterface.addConstraint('ProgramCourses', {
        fields: ['programId', 'courseId'],
        type: 'primary key',
        name: 'program_course_pk'
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProgramCourses')
  }
}