import * as graphql from 'graphql'
import baseWeixinInfo from './baseWeixinInfo'

const singleWeixinInfo = new graphql.GraphQLObjectType({
  name: 'singleWeixinInfo',
  fields: {
    code: {
      type: graphql.GraphQLInt
    },
    message: {
      type: graphql.GraphQLString
    },
    data: {
      type: baseWeixinInfo
    }
  }
})

export default singleWeixinInfo
