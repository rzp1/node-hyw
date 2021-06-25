import fetch from '@/utils/fetch'

const addWeixinInfo = (info) => {
  let query = `
    mutation {
      addWeixinInfo (
        type_id: ${info.type_id || 1},
        title: "${info.title || ''}",
        introduction: "${info.introduction || ''}",
        weixin_qrcode: "${info.weixin_qrcode || ''}",
        weixin_num: "${info.weixin_num || ''}",
      )
      {
       code
       message
       data
      }
    }
  `
  return fetch({
    url: '/graphql',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    data: { query }
  })
}
export default addWeixinInfo
