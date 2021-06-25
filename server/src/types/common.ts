import * as graphql from 'graphql'

const commonType = new graphql.GraphQLObjectType({
  name: 'commonType',
  fields: {
    code: {
      type: graphql.GraphQLInt
    },
    message: {
      type: graphql.GraphQLString
    },
    data: {
      type: graphql.GraphQLString
    },
    count: {
      type: graphql.GraphQLInt
    }
  }
})

export default commonType
