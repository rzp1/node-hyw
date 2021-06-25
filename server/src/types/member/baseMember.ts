import * as graphql from 'graphql'
import logger from '../../libs/logger'
import { SafeQuestion } from '../../models/SafeQuestion'
import { Message } from '../../models/Message'
import { Member } from '../../models/Member'

const baseMember = new graphql.GraphQLObjectType({
  name: 'baseMemberType',
  fields: {
    id: {
      type: graphql.GraphQLInt
    },
    createdAt: {
      type: graphql.GraphQLString
    },
    updatedAt: {
      type: graphql.GraphQLString
    },
    account: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
    password: {
      type: graphql.GraphQLString
    },
    sex: {
      type: graphql.GraphQLInt
    },
    rank: {
      type: graphql.GraphQLInt
    },
    money: {
      type: graphql.GraphQLString
    },
    // safe_question_id: {
    //   type: graphql.GraphQLInt
    // },
    // safe_question: {
    //   type: graphql.GraphQLString,
    //   resolve: async (data) => {
    //     try {
    //       let question = await SafeQuestion.findOne({
    //         where: {
    //           id: data.safe_question_id
    //         }
    //       })
    //       return question.question
    //     } catch (error) {
    //       logger.debug('question查询错误', error)
    //       return null
    //     }
    //   }
    // },
    // safe_answer: {
    //   type: graphql.GraphQLString
    // },
    telephone: {
      type: graphql.GraphQLString
    },
    last_login_time: {
      type: graphql.GraphQLString
    },
    last_login_ip: {
      type: graphql.GraphQLString
    },
    avatar_url: {
      type: graphql.GraphQLString
    },
    messages: {
      type: graphql.GraphQLString,
      resolve: async (data) => {
        try {
          let member = await Member.findOne({
            where: {
              id: data.id
            },
            include: [Message]
          })
          return JSON.stringify(member.messages)
        } catch (error) {
          logger.debug('members查询错误', error)
        }
      }
    },
    meta: {
      type: graphql.GraphQLString
    }
  }
})

export default baseMember
