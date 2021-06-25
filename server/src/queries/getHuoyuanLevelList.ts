import * as graphql from 'graphql'
import huoyuanLevelList from '../types/huoyuanLevel/huoyuanLevelList'
import { HuoyuanLevel } from '../models/HuoyuanLevel'
import logger from '../libs/logger'

var getHuoyuanLevelList = {
  type: huoyuanLevelList,
  args: {},
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let huoyuanLevels = await HuoyuanLevel.findAll()
      return { code: 0, data: huoyuanLevels, message: 'getHuoyuanLevelList success' }
    } catch (error) {
      logger.error('getHuoyuanLevelList error', error)
      return { code: 1, data: error, message: 'getHuoyuanLevelList error' }
    }
  }
}

export default getHuoyuanLevelList
