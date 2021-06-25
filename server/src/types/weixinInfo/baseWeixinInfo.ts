import * as graphql from 'graphql'

const baseWeixinInfo = new graphql.GraphQLObjectType({
  name: 'baseWeixinInfoType',
  fields: {
    id: {
      type: graphql.GraphQLInt
    },
    createdAt: {
      type: graphql.GraphQLString
    },
    member_id: {
      type: graphql.GraphQLInt
    },
    type_id: {
      type: graphql.GraphQLInt
    },
    title: {
      type: graphql.GraphQLString
    },
    introduction: {
      type: graphql.GraphQLString
    },
    weixin_qrcode: {
      type: graphql.GraphQLString
    },
    weixin_num: {
      type: graphql.GraphQLString
    },
    popularity: {
      type: graphql.GraphQLString
    },
    status: {
      type: graphql.GraphQLInt
    },
    recommended_type: {
      type: graphql.GraphQLString
    },
    meta: {
      type: graphql.GraphQLString
    }
  }
})

export default baseWeixinInfo
