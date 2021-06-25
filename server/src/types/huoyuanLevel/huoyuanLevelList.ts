import * as graphql from 'graphql'
import baseHuoyuanLevel from './baseHuoyuanLevel'

const huoyuanLevelList = new graphql.GraphQLObjectType({
  name: 'huoyuanLevelListType',
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
      type: new graphql.GraphQLList(baseHuoyuanLevel)
    }
  }
})

export default huoyuanLevelList
