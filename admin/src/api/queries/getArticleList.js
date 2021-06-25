import fetch from '@/utils/fetch'

const getArticleList = (obj) => {
  let query = {
    query: `{
      getArticleList (
        page: ${obj.current || 1}
        limit: ${obj.pageSize || 18}
        type_id: ${obj.type_id || 1}
        searchTitle: "${obj.searchTitle || ''}"
        ) {
        code
        message
        count
        data {
          id
          title
          cover_img
          content
          abstract
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

export default getArticleList
