import fetch from '@/utils/fetch'

export const uploadRichTextImg = (imgData) => {
  return fetch({
    url: '/api/image/upload/richTextImg',
    method: 'post',
    data: {imgData}
  })
}

export const login = (member) => {
  return fetch({
    url: '/api/registerLogin/login',
    method: 'post',
    data: {
      account: member.account,
      password: member.password
    }
  })
}

export const register = (data) => {
  return fetch({
    url: '/api/registerLogin/register',
    method: 'post',
    data: {
      account: data.account,
      name: data.name,
      password: data.password,
      sex: Number(data.sex),
      safe_question_id: Number(data.safe_question_id),
      safe_answer: data.safe_answer,
      telephone: data.telephone
    }
  })
}

export const pay = (data) => {
  return fetch({
    url: '/api/pay/order_pay',
    method: 'post',
    data: {
      weixin_id: data.weixin_id || 0,
      huoyuan_id: data.huoyuan_id || 0,
      money: data.money || 0
    }
  })
}
