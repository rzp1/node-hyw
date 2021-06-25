import * as graphql from 'graphql'
import commonType from '../types/common'
import { WeixinInfo } from '../models/WeixinInfo'
import logger from '../libs/logger'

interface weixinInfo {
  type_id: number,
  title: string,
  introduction: string,
  weixin_qrcode: string,
  weixin_num: string
}

var addWeixinInfo = {
  type: commonType,
  args: {
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
      let { type_id, title, introduction, weixin_qrcode, weixin_num } : weixinInfo = args
      let member_id: number = ctx.req.memberInfo.id
      let weixinInfo = await WeixinInfo.create({
        member_id,
        type_id,
        title,
        introduction,
        weixin_qrcode,
        weixin_num
      })
      if (weixinInfo) {
        return { code: 0, message: '创建成功', data: weixinInfo.id}
      } else {
        return { code: 1, message: '创建失败' }
      }
    } catch (error) {
      logger.error('addWeixinInfo error', error)
      return { code: 1, data: error, message: 'addWeixinInfo error' }
    }
  }
}
export default addWeixinInfo