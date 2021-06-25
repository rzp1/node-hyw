import * as graphql from 'graphql'

const baseArticle = new graphql.GraphQLObjectType({
  name: 'baseArticleType',
  fields: {
    id: {
      type: graphql.GraphQLInt
    },
    createdAt: {
      type: graphql.GraphQLString
    },
    member_id: {
      type: graphql.GraphQLInt
    },
    type_id: {
      type: graphql.GraphQLInt
    },
    title: {
      type: graphql.GraphQLString
    },
    cover_img: {
      type: graphql.GraphQLString
    },
    content: {
      type: graphql.GraphQLString
    },
    abstract: {
      type: graphql.GraphQLString
    },
    popularity: {
      type: graphql.GraphQLString
    },
    is_recommended: {
      type: graphql.GraphQLInt
    },
    is_checked: {
      type: graphql.GraphQLInt
    },
    meta: {
      type: graphql.GraphQLString
    }
  }
})

export default baseArticle
