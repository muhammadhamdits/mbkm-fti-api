'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentProgramCourses', {
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentPrograms',
          key: 'studentId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      programId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StudentPrograms',
          key: 'programId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ProgramCourses',
          key: 'courseId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      // proposed, accepted, rejected
      status: {
        type: Sequelize.STRING,
        defaultValue: 'proposed'
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
      queryInterface.addConstraint('StudentProgramCourses',{
        fields: ['studentId', 'programId', 'courseId'],
        type: 'primary key',
        name: 'student_program_course_pk'
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentProgramCourses')
  }
}