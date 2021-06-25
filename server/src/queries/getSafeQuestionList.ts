import * as graphql from 'graphql'
import safeQuestionList from '../types/safeQuestion/safeQuestionList'
import { SafeQuestion } from '../models/SafeQuestion'
import logger from '../libs/logger'

var getSafeQuestionList = {
  type: safeQuestionList,
  args: {},
  resolve: async (obj: any, args: any, next: any) => {
    try {
      let safeQuestions = await SafeQuestion.findAll()
      return { code: 0, data: safeQuestions, message: 'getSafeQuestionList success' }
    } catch (error) {
      logger.error('getSafeQuestionList error', error)
      return { code: 1, data: error, message: 'getSafeQuestionList error' }
    }
  }
}

export default getSafeQuestionList
