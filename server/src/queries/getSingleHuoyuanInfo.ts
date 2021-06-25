import * as graphql from 'graphql'
import singleHuoyuanInfo from '../types/huoyuanInfo/singleHuoyuanInfo'
import { HuoyuanInfo } from '../models/HuoyuanInfo'
import logger from '../libs/logger'

var getSingleHuoyuanInfo = {
  type: singleHuoyuanInfo,
  args: {
    id: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let id: number = args.id
      let huoyuanInfo = await HuoyuanInfo.findById(id)
      if (!huoyuanInfo) {
        return { code: 2, message: '暂无货源' }
      }
      return { code: 0, data: huoyuanInfo, message: 'getSingleHuoyuanInfo success' }
    } catch (error) {
      logger.error('getSingleHuoyuanInfo error', error)
      return { code: 1, data: error, message: 'getSingleHuoyuanInfo error' }
    }
  }
}

export default getSingleHuoyuanInfo
