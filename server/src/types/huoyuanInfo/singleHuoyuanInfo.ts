import * as graphql from 'graphql'
import baseHuoyuanInfo from './baseHuoyuanInfo'

const singleHuoyuanInfo = new graphql.GraphQLObjectType({
  name: 'singleHuoyuanInfoType',
  fields: {
    code: {
      type: graphql.GraphQLInt
    },
    message: {
      type: graphql.GraphQLString
    },
    data: {
      type: baseHuoyuanInfo
    }
  }
})

export default singleHuoyuanInfo
