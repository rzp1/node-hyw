function getSingleArticle (id, callback) {
  let query = {
    query: `{
      getSingleArticle (
        id: ${id || 0}
        ) {
        code
        message
        data {
          id
          title
          cover_img
          content
          popularity
          createdAt
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
