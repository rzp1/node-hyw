import * as graphql from 'graphql'
import articleList from '../types/article/articleList'
import { Article } from '../models/Article'
import logger from '../libs/logger'
import { Sequelize } from 'sequelize-typescript'

const Op = Sequelize.Op
interface obj {
  page: number,
  limit: number,
  type_id: number,
  searchTitle: string
}

var getArticleList = {
  type: articleList,
  args: {
    page: {
      type: graphql.GraphQLInt
    },
    limit: {
      type: graphql.GraphQLInt
    },
    type_id: {
      type: graphql.GraphQLInt
    },
    searchTitle: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let { limit, page, type_id, searchTitle } : obj = args
      let myWhere = {}
      if (type_id) {
        Object.assign(myWhere, {
          type_id
        })
      }
      if (searchTitle) {
        Object.assign(myWhere, {
          title: {
            [Op.like]: `%${searchTitle}%`
          }
        })
      }
      let articles = await Article.findAndCount(
        {
          where: myWhere,
          raw: true,
          limit: limit,
          offset: (page - 1) * limit
        }
      )
      if (!articles) {
        return { code: 2, message: '暂无文章' }
      }
      return { code: 0, data: articles.rows, count: articles.count, message: 'getArticleList success' }
    } catch (error) {
      logger.error('getArticleList error', error)
      return { code: 1, data: error, message: 'getArticleList error' }
    }
  }
}

export default getArticleList
