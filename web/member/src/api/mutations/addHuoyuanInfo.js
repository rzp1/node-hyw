import fetch from '@/utils/fetch'

const addHuoyuanInfo = (info) => {
  let query = `
    mutation {
      addHuoyuanInfo (
        type_id: ${info.type_id || 0},
        title: "${info.title || ''}",
        main_img: "${info.main_img || ''}",
        introduction: "${info.introduction || ''}",
        weixin_qrcode: "${info.weixin_qrcode || ''}",
        weixin_num: "${info.weixin_num || ''}",
        qq_num: "${info.qq_num || ''}",
        tel_num: "${info.tel_num || ''}",
        describe: "${info.describe || ''}"
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
    data: JSON.stringify({ query })
  })
}
export default addHuoyuanInfo
