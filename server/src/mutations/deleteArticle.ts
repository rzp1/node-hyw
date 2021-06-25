import * as graphql from 'graphql'
import commonType from '../types/common'
import { Article } from '../models/Article'
import logger from '../libs/logger'
import { Sequelize } from 'sequelize-typescript'

const Op = Sequelize.Op
var deleteArticle = {
  type: commonType,
  args: {
    ids: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any) => {
    try {
      let ids: any = JSON.parse(args.ids)
      let article = await Article.destroy({
        where: {
          id: {
            [Op.in]: ids
          }
        }
      })
      if (article) {
        return { code: 0, message: '删除成功' }
      } else {
        return { code: 1, message: '删除失败' }
      }
    } catch (error) {
      logger.error('deleteArticle error', error)
      return { code: 1, data: error, article: 'deleteArticle error' }
    }
  }
}
export default deleteArticle