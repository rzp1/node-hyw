import fetch from '@/utils/fetch'

const updateMember = (memeberInfo) => {
  let query = `
    mutation {
      updateMember (
        id: ${memeberInfo.id || 0},
        account: "${memeberInfo.account || ''}",
        name: "${memeberInfo.name || ''}",
        sex: ${Number(memeberInfo.sex) || 0},
        oldPassword: "${memeberInfo.oldPassword || ''}",
        password: "${memeberInfo.password || ''}",
        telephone: "${memeberInfo.telephone || ''}",
        safe_question_id: ${Number(memeberInfo.safe_question_id) || 0},
        safe_answer: "${memeberInfo.safe_answer || ''}",
        avatar_url: "${memeberInfo.avatar_url || ''}"
      )
      {
       code
       message
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
export default updateMember
