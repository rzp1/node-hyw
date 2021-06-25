'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let sequelize = queryInterface.sequelize
    return sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'safe_question',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          question: {
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
