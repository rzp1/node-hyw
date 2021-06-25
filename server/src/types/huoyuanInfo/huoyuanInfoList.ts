import * as graphql from 'graphql'
import baseHuoyuanInfo from './baseHuoyuanInfo'

const huoyuanInfoList = new graphql.GraphQLObjectType({
  name: 'huoyuanInfoListType',
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
      type: new graphql.GraphQLList(baseHuoyuanInfo)
    }
  }
})

export default huoyuanInfoList
