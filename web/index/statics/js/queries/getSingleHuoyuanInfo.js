function getSingleHuoyuanInfo (id, callback) {
  let query = {
    query: `{
      getSingleHuoyuanInfo (
        id: ${id || 0}
        ) {
        code
        message
        data {
          id
          type_id
          title
          main_img
          introduction
          weixin_qrcode
          weixin_num
          qq_num
          tel_num
          popularity
          describe
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
