import * as graphql from 'graphql'
import huoyuanTypeList from '../types/huoyuanType/huoyuanTypeList'
import { HuoyuanType } from '../models/HuoyuanType'
import logger from '../libs/logger'

var getHuoyuanTypeList = {
  type: huoyuanTypeList,
  args: {
    is_recommend: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let is_recommend: number = args.is_recommend
      let myWhere = {}
      if (is_recommend) {
        Object.assign(myWhere, {
          is_recommend
        })
      }
      let huoyuanLevels = await HuoyuanType.findAll({
        where: myWhere
      })
      return { code: 0, data: huoyuanLevels, message: 'getHuoyuanTypeList success' }
    } catch (error) {
      logger.error('getHuoyuanTypeList error', error)
      return { code: 1, data: error, message: 'getHuoyuanTypeList error' }
    }
  }
}

export default getHuoyuanTypeList
