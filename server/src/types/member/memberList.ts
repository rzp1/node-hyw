import * as graphql from 'graphql'
import baseMember from './baseMember'

const memberList = new graphql.GraphQLObjectType({
  name: 'memberListType',
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
      type: new graphql.GraphQLList(baseMember)
    }
  }
})

export default memberList
