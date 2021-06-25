import fetch from '@/utils/fetch'

const updateHuoyuanInfo = (info) => {
  let query = `
    mutation {
      updateHuoyuanInfo (
        id: ${info.id || 0},
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
    data: { query }
  })
}
export default updateHuoyuanInfo
