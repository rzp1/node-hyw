import * as graphql from 'graphql'

const baseHuoyuanLevel = new graphql.GraphQLObjectType({
  name: 'baseHuoyuanLevelType',
  fields: {
    id: {
      type: graphql.GraphQLInt
    },
    name: {
      type: graphql.GraphQLString
    },
    money: {
      type: graphql.GraphQLString
    },
    time: {
      type: graphql.GraphQLFloat
    },
    meta: {
      type: graphql.GraphQLString
    }
  }
})

export default baseHuoyuanLevel
