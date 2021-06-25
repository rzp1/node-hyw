import * as graphql from 'graphql'
import commonType from '../types/common'
import { HuoyuanLevel } from '../models/HuoyuanLevel'
import logger from '../libs/logger'

var deleteHuoyuanLevel = {
  type: commonType,
  args: {
    id: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any) => {
    try {
      let id: number = args.id
      let isExist = await HuoyuanLevel.findById(id)
      if (!isExist) {
        return { code: 2, message: '该等级不存在，操作失败' }
      }
      let huoyuanLevel = await HuoyuanLevel.destroy({
        where: {
          id
        }
      })
      if (huoyuanLevel) {
        return { code: 0, message: '删除成功' }
      } else {
        return { code: 1, message: '删除失败' }
      }
    } catch (error) {
      logger.error('deleteHuoyuanLevel error', error)
      return { code: 1, data: error, message: 'deleteHuoyuanLevel error' }
    }
  }
}
export default deleteHuoyuanLevel