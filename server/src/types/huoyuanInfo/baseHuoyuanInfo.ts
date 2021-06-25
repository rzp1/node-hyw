import * as graphql from 'graphql'
import logger from '../../libs/logger'
import { HuoyuanType } from '../../models/HuoyuanType'

const baseHuoyuanInfo = new graphql.GraphQLObjectType({
  name: 'baseHuoyuanInfoType',
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
    type_text: {
      type: graphql.GraphQLString,
      resolve: async (data) => {
        try {
          let huoyuanType = await HuoyuanType.findOne({
            where: {
              id: data.type_id
            }
          })
          return huoyuanType.name
        } catch (error) {
          logger.debug('huoyuanType 查询错误', error)
          return null
        }
      }
    },
    title: {
      type: graphql.GraphQLString
    },
    main_img: {
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
    qq_num: {
      type: graphql.GraphQLString
    },
    tel_num: {
      type: graphql.GraphQLString
    },
    describe: {
      type: graphql.GraphQLString
    },
    popularity: {
      type: graphql.GraphQLString
    },
    status: {
      type: graphql.GraphQLInt
    },
    recommended_type: {
      type: graphql.GraphQLInt
    },
    is_delete: {
      type: graphql.GraphQLInt
    },
    meta: {
      type: graphql.GraphQLString
    }
  }
})

export default baseHuoyuanInfo
