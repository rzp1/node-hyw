import * as graphql from 'graphql'
import baseArticle from './baseArticle'

const singleArticle = new graphql.GraphQLObjectType({
  name: 'singleArticleType',
  fields: {
    code: {
      type: graphql.GraphQLInt
    },
    message: {
      type: graphql.GraphQLString
    },
    data: {
      type: baseArticle
    }
  }
})

export default singleArticle
