import fetch from '@/utils/fetch'

const getSingleHuoyuanInfo = (id) => {
  let query = {
    query: `{
      getSingleHuoyuanInfo (
        id: ${Number(id) || 0}
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
          describe
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

export default getSingleHuoyuanInfo
