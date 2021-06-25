'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('huoyuan_type', [
      {
        name: '女装',
        is_recommend: 1
      }, {
        name: '童装',
        is_recommend: 1
      }, {
        name: '男装',
        is_recommend: 1
      }, {
        name: '女鞋',
        is_recommend: 1
      }, {
        name: '童鞋'
      }, {
        name: '男鞋'
      }, {
        name: '运动鞋'
      }, {
        name: '健康'
      }, {
        name: '配饰'
      }, {
        name: '数码'
      }, {
        name: '箱包',
        is_recommend: 1
      }, {
        name: '母婴'
      }, {
        name: '香烟'
      }, {
        name: '内衣',
        is_recommend: 1
      }, {
        name: '美容'
      }, {
        name: '家纺',
        is_recommend: 1
      }, {
        name: '玩具',
        is_recommend: 1
      }, {
        name: '食品',
        is_recommend: 1
      }, {
        name: '新奇'
      }, {
        name: '其他'
      }], {});
  },

  down: (queryInterface, Sequelize) => {}
};