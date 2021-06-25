import * as graphql from 'graphql'

const baseMessage = new graphql.GraphQLObjectType({
  name: 'baseMessageType',
  fields: {
    id: {
      type: graphql.GraphQLInt
    },
    createdAt: {
      type: graphql.GraphQLString
    },
    updatedAt: {
      type: graphql.GraphQLString
    },
    member_id: {
      type: graphql.GraphQLInt
    },
    content: {
      type: graphql.GraphQLString
    },
    status: {
      type: graphql.GraphQLInt
    },
    meta: {
      type: graphql.GraphQLString
    }
  }
})

export default baseMessage
