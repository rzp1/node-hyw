import * as graphql from 'graphql'
import commonType from '../types/common'
import { HuoyuanLevel } from '../models/HuoyuanLevel'
import logger from '../libs/logger'

var updateHuoyuanLevel = {
  type: commonType,
  args: {
    id: {
      type: graphql.GraphQLInt
    },
    name: {
      type: graphql.GraphQLString
    },
    money: {
      type: graphql.GraphQLString
    },
    time: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any) => {
    try {
      let id: number = args.id
      let name: string = args.name
      let money: string = args.money
      let time: number = args.time
      let huoyuanLevel = await HuoyuanLevel.findById(id)
      if (!huoyuanLevel) {
        return { code: 2, message: '该等级不存在，操作失败' }
      }
      let res = await HuoyuanLevel.update({
        name,
        money,
        time
      },{
        where: {
          id
        }
      })
      if (res) {
        return { code: 0, message: '修改成功' }
      } else {
        return { code: 1, message: '修改失败' }
      }
    } catch (error) {
      logger.error('updateHuoyuanLevel error', error)
      return { code: 1, data: error, message: 'updateHuoyuanLevel error' }
    }
  }
}
export default updateHuoyuanLevel