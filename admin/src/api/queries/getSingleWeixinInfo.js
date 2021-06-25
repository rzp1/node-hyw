import fetch from '@/utils/fetch'

const getSingleWeixinInfo = (id) => {
  let query = {
    query: `{
      getSingleWeixinInfo (
        id: ${id}
      ) {
        code
        message
        data {
          id
          title
          type_id
          weixin_num
          weixin_qrcode
          introduction
          status
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

export default getSingleWeixinInfo
