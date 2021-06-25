function getSingleWeixinInfo (id, callback) {
  let query = {
    query: `{
      getSingleWeixinInfo (
        id: ${id || 0}
        ) {
        code
        message
        data {
          id
          type_id
          title
          introduction
          weixin_qrcode
          weixin_num
          popularity
          status
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
