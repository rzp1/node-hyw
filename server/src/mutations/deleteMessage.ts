import * as graphql from 'graphql'
import commonType from '../types/common'
import { Message } from '../models/Message'
import logger from '../libs/logger'
import { Sequelize } from 'sequelize-typescript'

const Op = Sequelize.Op
var deleteMessage = {
  type: commonType,
  args: {
    ids: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any) => {
    try {
      let ids: any = JSON.parse(args.ids)
      let message = await Message.destroy({
        where: {
          id: {
            [Op.in]: ids
          }
        }
      })
      if (message) {
        return { code: 0, message: '删除成功' }
      } else {
        return { code: 1, message: '删除失败' }
      }
    } catch (error) {
      logger.error('deleteMessage error', error)
      return { code: 1, data: error, message: 'deleteMessage error' }
    }
  }
}
export default deleteMessage