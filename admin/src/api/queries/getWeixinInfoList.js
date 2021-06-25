import fetch from '@/utils/fetch'

const getWeixinInfoList = (page, limit) => {
  let query = {
    query: `{
      getWeixinInfoList (
        page: ${page}
        limit: ${limit}
        type_id: 0
      ) {
        code
        message
        count
        data {
          id
          title
          type_id
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

export default getWeixinInfoList
