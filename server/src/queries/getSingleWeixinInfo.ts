import * as graphql from 'graphql'
import singleWeixinInfo from '../types/weixinInfo/singleWeixinInfo'
import { WeixinInfo } from '../models/WeixinInfo'
import logger from '../libs/logger'

var getSingleWeixinInfo = {
  type: singleWeixinInfo,
  args: {
    id: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let id: number = args.id
      let weixinInfo = await WeixinInfo.findById(id)
      if (!weixinInfo) {
        return { code: 2, message: '暂无货源' }
      }
      return { code: 0, data: weixinInfo, message: 'getSingleWeixinInfo success' }
    } catch (error) {
      logger.error('getSingleWeixinInfo error', error)
      return { code: 1, data: error, message: 'getSingleWeixinInfo error' }
    }
  }
}

export default getSingleWeixinInfo
