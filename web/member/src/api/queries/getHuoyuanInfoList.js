import fetch from '@/utils/fetch'

const getHuoyuanInfoList = (page, limit, recommended_type) => {
  let query = {
    query: `{
      getHuoyuanInfoList (
        page: ${page}
        limit: ${limit}
        recommended_type: ${ recommended_type || 0 }
      ) {
        code
        message
        count
        data {
          id
          title
          type_text
          status
          createdAt
          popularity
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

export default getHuoyuanInfoList
