function getWeixinInfoList (obj, callback) {
  let query = {
    query: `{
      getWeixinInfoList (
        page: ${obj.page || 1}
        limit: ${obj.limit || 18}
        type_id: ${obj.type_id || 0}
        ) {
        code
        message
        count
        data {
          id
          title
          weixin_qrcode
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
