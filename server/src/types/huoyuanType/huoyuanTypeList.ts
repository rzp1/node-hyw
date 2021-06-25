import * as graphql from 'graphql'
import baseHuoyuanType from './baseHuoyuanType'

const huoyuanTypeList = new graphql.GraphQLObjectType({
  name: 'huoyuanTypeListType',
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
      type: new graphql.GraphQLList(baseHuoyuanType)
    }
  }
})

export default huoyuanTypeList
