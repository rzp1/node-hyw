'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let sequelize = queryInterface.sequelize
    return sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'huoyuan_info',
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
          level_id: {
            type: Sequelize.INTEGER
          },
          title: {
            type: Sequelize.STRING
          },
          main_img: {
            type: Sequelize.STRING
          },
          introduction: {
            type: Sequelize.TEXT
          },
          weixin_qrcode: {
            type: Sequelize.STRING
          },
          weixin_num: {
            type: Sequelize.STRING
          },
          qq_num: {
            type: Sequelize.STRING
          },
          tel_num: {
            type: Sequelize.STRING
          },
          describe: {
            type: Sequelize.TEXT
          },
          popularity: {
            type: Sequelize.INTEGER
          },
          status: {
            type: Sequelize.INTEGER
          },
          recommended_type: {
            type: Sequelize.INTEGER
          },
          expri_time: {
            type: Sequelize.BIGINT(13)
          },
          is_delete: {
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
