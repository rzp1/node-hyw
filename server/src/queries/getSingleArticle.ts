import * as graphql from 'graphql'
import singleArticle from '../types/article/singleArticle'
import { Article } from '../models/Article'
import logger from '../libs/logger'

var getSingleArticle = {
  type: singleArticle,
  args: {
    id: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let id: number = args.id
      let article = await Article.findById(id)
      if (!article) {
        return { code: 2, message: '该文章不存在' }
      }
      return { code: 0, data: article, message: 'getSingleArticle success' }
    } catch (error) {
      logger.error('getSingleArticle error', error)
      return { code: 1, data: error, message: 'getSingleArticle error' }
    }
  }
}

export default getSingleArticle
