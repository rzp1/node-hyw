import fetch from '@/utils/fetch'

const getMessageList = (page, limit) => {
  let query = {
    query: `{
      getMessageList (
        page: ${page}
        limit: ${limit}
      ) {
        code
        message
        count
        data {
          id
          content
          createdAt
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

export default getMessageList
