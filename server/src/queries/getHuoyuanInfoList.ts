import * as graphql from 'graphql'
import huoyuanInfoList from '../types/huoyuanInfo/huoyuanInfoList'
import { HuoyuanInfo } from '../models/HuoyuanInfo'
import logger from '../libs/logger'
import { Sequelize } from 'sequelize-typescript'

interface obj {
  page: number,
  limit: number,
  type: number
  recommended_type: number,
  type_id: number,
  keys: string,
  sortOrder: string,
  member_id: number,
  status: number,
  sortField: string,
  is_delete: number
}
const Op = Sequelize.Op
var getHuoyuanInfoList = {
  type: huoyuanInfoList,
  args: {
    page: {
      type: graphql.GraphQLInt
    },
    limit: {
      type: graphql.GraphQLInt
    },
    // 0 - 所有  1 - 推荐  2 - 类别  3 - 搜索
    type: {
      type: graphql.GraphQLInt
    },
    // 推荐 1 未推荐 2  首页精品推荐 3 首页所在分类展示 4 顶部滚动展示 5 货源详情页右侧推荐
    recommended_type: {
      type: graphql.GraphQLInt
    },
    type_id: {
      type: graphql.GraphQLInt
    },
    keys: {
      type: graphql.GraphQLString
    },
    // 状态 1 未支付 2 支付成功（未审核） 4 驳回（重新编辑 ） 8 审核通过
    status: {
      type: graphql.GraphQLInt
    },
    sortField: {
      type: graphql.GraphQLString
    },
    sortOrder: {
      type: graphql.GraphQLString
    },
    member_id: {
      type: graphql.GraphQLInt
    },
    is_delete: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any, ctx: any) => {
    try {
      let { limit, page, type, recommended_type, type_id, keys, member_id, status, sortField, sortOrder, is_delete }: obj = args
      let hyw_from: string = ctx.req.hywFrom
      let where: any = {
        is_delete: 0
      }
      let myOrder = [['createdAt', 'DESC']]
      console.log('hyw_from==========', hyw_from)   
      if (hyw_from === 'member') {
        let member_id: number = ctx.req.memberInfo.id
        Object.assign(where, {
          member_id
        })
      } else if(hyw_from === 'hyw' || hyw_from === 'admin') {
        Object.assign(where, {
          // status: 8
        })
        if (type === 1) {
          Object.assign(where, {
            recommended_type
          })
        } else if (type === 2) {
          Object.assign(where, {
            type_id
          })
        } else if (type === 3) {
          Object.assign(where, {
            [Op.or]: [
              {
                title: {
                  [Op.like]: `%${keys}%`
                }
              },
              {
                introduction: {
                  [Op.like]: `%${keys}%`
                }
              }
            ]
          })
        }
      }
      if (hyw_from === 'admin') {
        if (member_id) {
          Object.assign(where, {
            member_id
          })
        }
        if (status) {
          Object.assign(where, {
            status
          })
        }
        if (type_id) {
          Object.assign(where, {
            type_id
          })
        }
        if (recommended_type) {
          Object.assign(where, {
            recommended_type
          })
        }
        if (is_delete) {
          Object.assign(where, {
            is_delete
          })
        }
        if (sortField && sortOrder) {
          let order = sortOrder === 'descend' ? 'DESC' : sortOrder === 'ascend' ? 'ASC' : ''
          myOrder = [[sortField, order]]
        }
      }
      console.log('where========', where)
      let huoyuanInfos = await HuoyuanInfo.findAndCount({
        where,
        raw: true,
        limit: limit,
        offset: (page - 1) * limit,
        order: myOrder
      })
      return { code: 0, data: huoyuanInfos.rows, count: huoyuanInfos.count, message: 'getHuoyuanInfoList success' }
    } catch (error) {
      logger.error('getHuoyuanInfoList error', error)
      return { code: 1, data: error, message: 'getHuoyuanInfoList error' }
    }
  }
}

export default getHuoyuanInfoList
