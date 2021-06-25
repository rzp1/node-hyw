import fetch from '@/utils/fetch'

const deleteMessage = (ids) => {
  let query = `
    mutation {
      deleteMessage (
        ids: "${ids}"
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
export default deleteMessage
