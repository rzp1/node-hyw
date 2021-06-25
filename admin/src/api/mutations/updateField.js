import fetch from '@/utils/fetch'

const updateField = (id, key, value, type) => {
  let query = `
    mutation {
      updateField (
        id: ${id || 0},
        key: "${key || ''}",
        value: "${value || ''}"
        type: "${type || ''}"
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
    data: JSON.stringify({
      query
    })
  })
}
export default updateField