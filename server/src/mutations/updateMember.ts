import * as graphql from 'graphql'
import commonType from '../types/common'
import { Member } from '../models/Member'
import logger from '../libs/logger'
import { saltedPassword } from '../utils/common'

interface memberInfo {
  id: number,
  account: string,
  name: string,
  sex: number,
  oldPassword: string,
  password: string,
  telephone: string,
  safe_question_id: number,
  safe_answer: string,
  avatar_url: string
}
var updateMember = {
  type: commonType,
  args: {
    id: {
      type: graphql.GraphQLInt
    },
    account: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
    sex: {
      type: graphql.GraphQLInt
    },
    oldPassword: {
      type: graphql.GraphQLString
    },
    password: {
      type: graphql.GraphQLString
    },
    telephone: {
      type: graphql.GraphQLString
    },
    safe_question_id: {
      type: graphql.GraphQLInt
    },
    safe_answer: {
      type: graphql.GraphQLString
    },
    avatar_url: {
      type: graphql.GraphQLString
    }
  },
  resolve: async (obj: any, args: any, ctx: any) => {
    try {
      let { id, account, name, sex, oldPassword, password, telephone, safe_question_id, safe_answer, avatar_url } : memberInfo = args
      if (!id) {
        id = ctx.req.memberInfo.id
      }
      let oldMember = await Member.findById(id)
      if (!oldMember) {
        return { code: 2, message: '该会员不存在，操作失败' }
      }
      let obj = {
        account,
        name,
        sex,
        telephone
      }
      if (avatar_url) {
        Object.assign(obj, {
          avatar_url
        })
      }
      if (oldPassword && password && safe_question_id && safe_answer) {
        if ((safe_question_id !== oldMember.safe_question_id) || (safe_answer !== oldMember.safe_answer)) {
          return {code: 1, message: '验证错误'}
        }
        let oldPawd = saltedPassword(oldPassword)
        if (oldMember.password !== oldPawd) {
          return {code: 1, message: '原始密码不正确'}
        }
        Object.assign(obj, {
          password
        })
      }
      let res = await Member.update(obj, {
        where: {
          id
        }
      })
      if (res) {
        return { code: 0, message: '修改成功' }
      } else {
        return { code: 1, message: '修改失败' }
      }
    } catch (error) {
      logger.error('updateMember error', error)
      return { code: 1, data: error, message: 'updateMember error' }
    }
  }
}
export default updateMember