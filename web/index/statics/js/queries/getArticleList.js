function getArticleList (obj, callback) {
  let query = {
    query: `{
      getArticleList (
        page: ${obj.page || 1}
        limit: ${obj.limit || 18}
        type_id: ${obj.type_id || 1}
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
    data: query,
    callback
  })
}
