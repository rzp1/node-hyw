import * as graphql from 'graphql'
import weixinInfoList from '../types/weixinInfo/weixinInfoList'
import { WeixinInfo } from '../models/WeixinInfo'
import logger from '../libs/logger'

var getWeixinInfoList = {
  type: weixinInfoList,
  args: {
    page: {
      type: graphql.GraphQLInt
    },
    limit: {
      type: graphql.GraphQLInt
    },
    type_id: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any, ctx: any) => {
    try {
      let { limit, page, type_id } = args
      let hyw_from: string = ctx.req.hywFrom
      let where: any = {
        is_delete: 0
      }
      if(hyw_from === 'member'){
        let member_id: number = ctx.req.memberInfo.id
        Object.assign(where, {
          member_id
        })
      } else if(hyw_from === 'hyw') {
        Object.assign(where, {
          status: 8
        })
        if(type_id !== 0){
          Object.assign(where, {
            type_id
          })
        }
      }
      let WeixinInfos = await WeixinInfo.findAndCount({
        where,
        raw: true,
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createdAt', 'DESC']]
      })
      return { code: 0, data: WeixinInfos.rows, count: WeixinInfos.count, message: 'getWeixinInfoList success' }
    } catch (error) {
      logger.error('getWeixinInfoList error', error)
      return { code: 1, data: error, message: 'getWeixinInfoList error' }
    }
  }
}

export default getWeixinInfoList
