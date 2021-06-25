'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let sequelize = queryInterface.sequelize
    return sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'article',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
          member_id: {
            type: Sequelize.INTEGER
          },
          type_id: {
            type: Sequelize.INTEGER
          },
          title: {
            type: Sequelize.STRING
          },
          content: {
            type: Sequelize.TEXT
          },
          abstract: {
            type: Sequelize.STRING
          },
          popularity: {
            type: Sequelize.INTEGER
          },
          is_recommended: {
            type: Sequelize.INTEGER
          },
          cover_img: {
            type: Sequelize.STRING
          },
          is_checked: {
            type: Sequelize.INTEGER
          },
          meta: {
            type: Sequelize.STRING
          }
        },
        {
          charset: 'UTF8'
        },
        {transaction: t}
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
