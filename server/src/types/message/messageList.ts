import * as graphql from 'graphql'
import baseMessage from './baseMessage'

const messageList = new graphql.GraphQLObjectType({
  name: 'messageListType',
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
      type: new graphql.GraphQLList(baseMessage)
    }
  }
})

export default messageList
