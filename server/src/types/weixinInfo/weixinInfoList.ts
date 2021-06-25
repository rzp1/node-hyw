import * as graphql from 'graphql'
import baseWeixinInfo from './baseWeixinInfo'

const weixinInfoList = new graphql.GraphQLObjectType({
  name: 'weixinInfoListType',
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
      type: new graphql.GraphQLList(baseWeixinInfo)
    }
  }
})

export default weixinInfoList
