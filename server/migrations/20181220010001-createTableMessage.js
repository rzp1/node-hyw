'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let sequelize = queryInterface.sequelize
    return sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'message',
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
          content: {
            type: Sequelize.STRING
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
