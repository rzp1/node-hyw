import * as graphql from 'graphql'
import commonType from '../types/common'
import { WeixinInfo } from '../models/WeixinInfo'
import logger from '../libs/logger'

interface weixinInfo {
  id: number,
  type_id: number,
  title: string,
  introduction: string,
  weixin_qrcode: string,
  weixin_num: string
}

var updateWeixinInfo = {
  type: commonType,
  args: {
    id: {
      type: graphql.GraphQLInt
    },
    type_id: {
      type: graphql.GraphQLInt
    },
    title: {
      type: graphql.GraphQLString
    },
    introduction: {
      type: graphql.GraphQLString
    },
    weixin_qrcode: {
      type: graphql.GraphQLString
    },
    weixin_num: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any, ctx: any) => {
    try {
      let { id, type_id, title, introduction, weixin_qrcode, weixin_num } : weixinInfo = args
      let oldInfo = await WeixinInfo.findById(id)
      if (!oldInfo) {
        return { code: 2, message: '该会员不存在，操作失败' }
      }
      let obj = {
        type_id,
        title,
        introduction,
        weixin_qrcode,
        weixin_num
      }
      if(oldInfo.status > 0) {
        Object.assign(obj, {
          status: 2
        })
      }
      let res = await WeixinInfo.update(obj, {
        where: {
          id
        }
      })
      if (res) {
        return { code: 0, message: '修改成功', data: id}
      } else {
        return { code: 1, message: '修改失败' }
      }
    } catch (error) {
      logger.error('updateWeixinInfo error', error)
      return { code: 1, data: error, message: 'updateWeixinInfo error' }
    }
  }
}
export default updateWeixinInfo