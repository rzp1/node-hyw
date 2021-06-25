import fetch from '@/utils/fetch'

const deleteArticle = (ids) => {
  let query = `
    mutation {
      deleteArticle (
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
export default deleteArticle
