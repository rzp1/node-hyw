import fetch from '@/utils/fetch'

const getSafeQuestionList = (token) => {
  let query = {
    query: `{
      getSafeQuestionList {
        code
        message
        data {
          id
          question
        }
      }
    }`
  }
  return fetch({
    url: '/graphql',
    method: 'get',
    params: query
  })
}

export default getSafeQuestionList
