'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let sequelize = queryInterface.sequelize
    return sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'pay_record',
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
          member_account: {
            type: Sequelize.STRING
          },
          houyuan_type: {
            type: Sequelize.INTEGER
          },
          recommended_type: {
            type: Sequelize.INTEGER
          },
          money: {
            type: Sequelize.STRING
          },
          pay_introduction: {
            type: Sequelize.STRING
          },
          remark: {
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
