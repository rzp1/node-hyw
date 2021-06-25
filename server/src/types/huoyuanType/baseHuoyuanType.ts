import * as graphql from 'graphql'
import baseHuoyuanInfo from '../huoyuanInfo/baseHuoyuanInfo'
import { HuoyuanInfo } from '../../models/HuoyuanInfo'
// import { HuoyuanType } from '../../models/HuoyuanType'
import logger from '../../libs/logger'

const baseHuoyuanType = new graphql.GraphQLObjectType({
  name: 'baseHuoyuanTypeType',
  fields: {
    id: {
      type: graphql.GraphQLInt
    },
    name: {
      type: graphql.GraphQLString
    },
    huoyuanInfos: {
      type: new graphql.GraphQLList(baseHuoyuanInfo),
      resolve: async (data) => {
        try {
          let huoyuanInfo = await HuoyuanInfo.findAll({
            where: {
              type_id: data.id,
              status: 8,
              recommended_type: 0
            },
            limit: 5
          })
          return huoyuanInfo
          // let huoyuanType = await HuoyuanType.findOne({
          //   where: {
          //     id: data.id
          //   },
          //   limit: 2,
          //   include: [HuoyuanInfo]
          // })
          // return huoyuanType.huoyuanInfos
        } catch (error) {
          logger.debug('huoyuanInfos查询错误', error)
        }
      }
    },
    meta: {
      type: graphql.GraphQLString
    }
  }
})

export default baseHuoyuanType
