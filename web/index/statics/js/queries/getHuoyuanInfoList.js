function getHuoyuanInfoList (obj, callback) {
  let query = {
    query: `{
      getHuoyuanInfoList (
        page: ${obj.page || 1}
        limit: ${obj.limit || 18}
        type: ${obj.type || 0}
        recommended_type: ${obj.recommended_type || 0}
        type_id: ${obj.type_id || 0}
        keys: "${obj.keys || ''}"
        ) {
        code
        message
        count
        data {
          id
          title
          main_img
          introduction
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
