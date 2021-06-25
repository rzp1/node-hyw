import * as graphql from 'graphql'
import baseMember from './baseMember'

const singleMember = new graphql.GraphQLObjectType({
  name: 'singleMemberType',
  fields: {
    code: {
      type: graphql.GraphQLInt
    },
    message: {
      type: graphql.GraphQLString
    },
    data: {
      type: baseMember
    }
  }
})

export default singleMember
