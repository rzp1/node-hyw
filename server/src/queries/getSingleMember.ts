import * as graphql from 'graphql'
import singleMember from '../types/member/singleMember'
import { Member } from '../models/Member'
import logger from '../libs/logger'

var getSingleMember = {
  type: singleMember,
  args: {
    id: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let id: number = args.id
      if (!id) {
        id = next.req.memberInfo.id
      }
      let members = await Member.findById(id)
      if (!members) {
        return { code: 2, message: '暂无会员' }
      }
      return { code: 0, data: members, message: 'getSingleMember success' }
    } catch (error) {
      logger.error('getSingleMember error', error)
      return { code: 1, data: error, message: 'getSingleMember error' }
    }
  }
}

export default getSingleMember
