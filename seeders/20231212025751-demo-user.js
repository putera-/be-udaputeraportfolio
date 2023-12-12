'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // creat 100 dummy users
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        firstName: 'John ' + (i + 1),
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    // undo create dummy user
    await queryInterface.bulkDelete('Users', null, {});
  }
};
