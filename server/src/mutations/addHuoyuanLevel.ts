import * as graphql from 'graphql'
import commonType from '../types/common'
import { HuoyuanLevel } from '../models/HuoyuanLevel'
import logger from '../libs/logger'

var addHuoyuanLevel = {
  type: commonType,
  args: {
    name: {
      type: graphql.GraphQLString
    },
    money: {
      type: graphql.GraphQLString
    },
    time: {
      type: graphql.GraphQLFloat
    }
  },
  resolve: async (obj: any, args: any) => {
    try {
      let name: string = args.name
      let money: string = args.money
      let time: number = args.time
      let isExist = await HuoyuanLevel.findOne({
        where: {
          name
        }
      })
      if (isExist) {
        return { code: 1, message: '该等级已存在' }
      }
      let huoyuanLevel = await HuoyuanLevel.create({
        name,
        money,
        time
      })
      if (huoyuanLevel) {
        return { code: 0, message: '创建成功' }
      } else {
        return { code: 1, message: '创建失败' }
      }
    } catch (error) {
      logger.error('addHuoyuanLevel error', error)
      return { code: 1, data: error, message: 'addHuoyuanLevel error' }
    }
  }
}
export default addHuoyuanLevel