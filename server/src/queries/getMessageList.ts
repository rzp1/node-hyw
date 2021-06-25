import * as graphql from 'graphql'
import messageList from '../types/message/messageList'
import { Message } from '../models/Message'
import logger from '../libs/logger'

interface argsInterface {
  page: number,
  limit: number,
  status: number
}

var getMessageList = {
  type: messageList,
  args: {
    page: {
      type: graphql.GraphQLInt
    },
    limit: {
      type: graphql.GraphQLInt
    }
  },
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let { limit, page, status }: argsInterface = args
      let member_id = next.req.memberInfo.id
      let myWhere = {
        member_id
      }
      let messages = await Message.findAndCount(
        {
          raw: true,
          limit: limit,
          offset: (page - 1) * limit,
          order: [['createdAt', 'DESC']],
          where: myWhere
        }
      )
      if (messages.count === 0) {
        return { code: 2, message: '暂无消息' }
      }
      return { code: 0, data: messages.rows, count: messages.count, message: 'getMessageList success' }
    } catch (error) {
      logger.error('getMessageList error', error)
      return { code: 1, data: error, message: 'getMessageList error' }
    }
  }
}

export default getMessageList
