'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('safe_question', [
      {
        question: '你最喜欢的格言是什么？'
      }, {
        question: '你的家乡是哪里？'
      }, {
        question: '你的小学叫什么？'
      }, {
        question: '你的父亲叫什么？'
      }, {
        question: '你的母亲叫什么？'
      }, {
        question: '你最喜欢的偶像是谁？'
      }, {
        question: '你最喜欢的歌曲是哪一首？'
      }, {
        question: '你喜欢的电影是哪一部？'
      }], {});
  },

  down: (queryInterface, Sequelize) => {}
};