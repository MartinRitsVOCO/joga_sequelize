'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Authors', [
      {
        id: 1,
        name: 'Ashley Galvin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Patrick Beach',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'MacKenzie Miller',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};