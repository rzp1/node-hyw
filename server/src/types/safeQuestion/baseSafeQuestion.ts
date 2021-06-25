import * as graphql from 'graphql'
import logger from '../../libs/logger'
import { Member } from '../../models/Member'
import { SafeQuestion } from '../../models/SafeQuestion'

const baseSafeQuestion = new graphql.GraphQLObjectType({
  name: 'baseSafeQuestionType',
  fields: {
    id: {
      type: graphql.GraphQLInt
    },
    question: {
      type: graphql.GraphQLString
    },
    members: {
      type: graphql.GraphQLString,
      resolve: async (data) => {
        try {
          let question = await SafeQuestion.findOne({
            where: {
              id: data.id
            },
            include: [Member]
          })
          return JSON.stringify(question.members)
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

export default baseSafeQuestion
