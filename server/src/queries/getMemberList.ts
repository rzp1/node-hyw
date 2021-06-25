import * as graphql from 'graphql'
import memberList from '../types/member/memberList'
import { Sequelize } from 'sequelize-typescript'
import { Member } from '../models/Member'
import logger from '../libs/logger'

const Op = Sequelize.Op

interface obj {
  page: number,
  limit: number,
  sortField: string,
  sortOrder: string,
  searchAccount: string,
  searchName: string,
  searchTel: string
}

var getMemberList = {
  type: memberList,
  args: {
    page: {
      type: graphql.GraphQLInt
    },
    limit: {
      type: graphql.GraphQLInt
    },
    sortField: {
      type: graphql.GraphQLString
    },
    sortOrder: {
      type: graphql.GraphQLString
    },
    searchAccount: {
      type: graphql.GraphQLString
    },
    searchName: {
      type: graphql.GraphQLString
    },
    searchTel: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let { limit, page, sortField,  sortOrder, searchAccount, searchName, searchTel } = args
      let myOrder = [['createdAt', 'DESC']]
      let myWhere = {}
      if (searchAccount) {
        Object.assign(myWhere, {
          account: {
            [Op.like]: `%${searchAccount}%`
          }
        })
      }
      if (searchName) {
        Object.assign(myWhere, {
          name: {
            [Op.like]: `%${searchName}%`
          }
        })
      }
      if (searchTel) {
        Object.assign(myWhere, {
          telephone: {
            [Op.like]: `%${searchTel}%`
          }
        })
      }
      if (sortField && sortOrder) {
        let order = sortOrder === 'descend' ? 'DESC' : sortOrder === 'ascend' ? 'ASC' : ''
        myOrder = [[sortField, order]]
      }
      let members = await Member.findAndCount(
        {
          where: myWhere,
          raw: true,
          limit: limit,
          offset: (page - 1) * limit,
          order: myOrder
        }
      )
      if (!members) {
        return { code: 2, message: '暂无会员' }
      }
      return { code: 0, data: members.rows, count: members.count, message: 'getMemberList success' }
    } catch (error) {
      logger.error('getMemberList error', error)
      return { code: 1, data: error, message: 'getMemberList error' }
    }
  }
}

export default getMemberList
