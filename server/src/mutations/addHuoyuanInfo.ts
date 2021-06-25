import * as graphql from 'graphql'
import commonType from '../types/common'
import { HuoyuanInfo } from '../models/HuoyuanInfo'
import logger from '../libs/logger'

interface huoyuanInfo {
  type_id: number,
  title: string,
  main_img: string,
  introduction: string,
  weixin_qrcode: string,
  weixin_num: string,
  qq_num: string,
  tel_num: string,
  describe: string
}

var addHuoyuanInfo = {
  type: commonType,
  args: {
    type_id: {
      type: graphql.GraphQLInt
    },
    title: {
      type: graphql.GraphQLString
    },
    main_img: {
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
    },
    qq_num: {
      type: graphql.GraphQLString
    },
    tel_num: {
      type: graphql.GraphQLString
    },
    describe: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any, ctx: any) => {
    try {
      let member_id: number = ctx.req.memberInfo.id
      let { type_id, title, main_img, introduction, weixin_qrcode, weixin_num, qq_num, tel_num, describe } : huoyuanInfo = args
      let huoyuanInfo = await HuoyuanInfo.create({
        member_id,
        type_id,
        title,
        main_img,
        introduction,
        weixin_qrcode,
        weixin_num,
        qq_num,
        tel_num,
        describe,
      })
      if (huoyuanInfo) {
        return { code: 0, message: '创建成功', data: huoyuanInfo.id}
      } else {
        return { code: 1, message: '创建失败' }
      }
    } catch (error) {
      logger.error('addHuoyuanInfo error', error)
      return { code: 1, data: error, message: 'addHuoyuanInfo error' }
    }
  }
}
export default addHuoyuanInfo