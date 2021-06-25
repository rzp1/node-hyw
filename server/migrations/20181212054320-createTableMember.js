'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let sequelize = queryInterface.sequelize
    return sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'member',
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
          account: {
            type: Sequelize.STRING
          },
          name: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          },
          sex: {
            type: Sequelize.INTEGER
          },
          rank: {
            type: Sequelize.INTEGER
          },
          money: {
            type: Sequelize.DECIMAL(10, 2)
          },
          safe_question_id: {
            type: Sequelize.INTEGER
          },
          safe_answer: {
            type: Sequelize.STRING
          },
          telephone: {
            type: Sequelize.STRING
          },
          last_login_time: {
            type: Sequelize.DATE
          },
          last_login_ip: {
            type: Sequelize.STRING
          },
          avatar_url: {
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
