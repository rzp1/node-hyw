import * as graphql from 'graphql'
import baseSafeQuestion from './baseSafeQuestion'

const safeQuestionList = new graphql.GraphQLObjectType({
  name: 'safeQuestionListType',
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
      type: new graphql.GraphQLList(baseSafeQuestion)
    }
  }
})

export default safeQuestionList
