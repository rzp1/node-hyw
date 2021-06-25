import fetch from '@/utils/fetch'

const getSingleMember = (id) => {
  let query = {
    query: `{
      getSingleMember (
        id: ${id || 0}
      ) {
        code
        message
        data {
          id
          account
          name
          rank
          sex
          money
          telephone
          last_login_time
          last_login_ip
          avatar_url
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

export default getSingleMember
