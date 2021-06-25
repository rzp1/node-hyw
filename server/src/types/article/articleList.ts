import * as graphql from 'graphql'
import baseArticle from './baseArticle'

const articleList = new graphql.GraphQLObjectType({
  name: 'articleListType',
  fields: {
    code: {
      type: graphql.GraphQLInt
    },
    message: {
      type: graphql.GraphQLString
    },
    count: {
      type: graphql.GraphQLInt
    },
    data: {
      type: new graphql.GraphQLList(baseArticle)
    }
  }
})

export default articleList
