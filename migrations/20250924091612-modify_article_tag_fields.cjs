'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      articleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Articles',
          key: 'id',
        },
        onUpdate: 'CASCADE'
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onUpdate: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ArticleTags');
  }
};
