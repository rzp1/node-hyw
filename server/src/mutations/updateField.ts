import * as graphql from 'graphql'
import commonType from '../types/common'
import { HuoyuanInfo } from '../models/HuoyuanInfo'
import { WeixinInfo } from '../models/WeixinInfo'
import logger from '../libs/logger'

var updateField = {
  type: commonType,
  args: {
    id: {
      type: graphql.GraphQLInt
    },
    key: {
      type: graphql.GraphQLString
    },
    value: {
      type: graphql.GraphQLString
    },
    type: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any) => {
    try {
      let id: number = args.id
      let key: string = args.key
      let value: string = args.value
      // 1 - 货源  2 - 微信
      let type: string = args.type
      let info: any = ''
      if (type === "1") {
        info = await HuoyuanInfo.findById(id)
      } else if (type === "2") {
        info = await WeixinInfo.findById(id)      
      } else {
        return { code: 1, message: '参数错误' }
      }
      if (!info) {
        return { code: 2, message: '该货源不存在，操作失败' }
      }
      const keyList = ['is_delete']
      if (keyList.indexOf(key) > -1) {
        info[key]= Number(value)
        info.changed(key, true)
        let res = await info.save()
        if (res) {
          return { code: 0, message: '操作成功' }
        } else {
          return { code: 1, message: '操作失败' }
        }
      } else {
        return { code: 1, message: '参数错误' }
      }
    } catch (error) {
      logger.error('updateField error', error)
      return { code: 1, data: error, message: 'updateField error' }
    }
  }
}
export default updateField