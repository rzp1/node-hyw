import * as graphql from 'graphql'
import commonType from '../types/common'
import { HuoyuanInfo } from '../models/HuoyuanInfo'
import logger from '../libs/logger'

interface huoyuanInfo {
  id: number,
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

var updateHuoyuanInfo = {
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
      let { id, type_id, title, main_img, introduction, weixin_qrcode, weixin_num, qq_num, tel_num, describe } : huoyuanInfo = args
      let oldInfo = await HuoyuanInfo.findById(id)
      if (!oldInfo) {
        return { code: 2, message: '该会员不存在，操作失败' }
      }
      let obj = {
        type_id,
        title,
        main_img,
        introduction,
        weixin_qrcode,
        weixin_num,
        qq_num,
        tel_num,
        describe
      }
      if(oldInfo.status > 0) {
        Object.assign(obj, {
          status: 2
        })
      }
      let res = await HuoyuanInfo.update(obj, {
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
      logger.error('updateHuoyuanInfo error', error)
      return { code: 1, data: error, message: 'updateHuoyuanInfo error' }
    }
  }
}
export default updateHuoyuanInfo