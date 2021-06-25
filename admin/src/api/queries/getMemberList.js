import fetch from '@/utils/fetch'

const getMemberList = (obj) => {
  let query = {
    query: `{
      getMemberList (
        page: ${obj.current}
        limit: ${obj.pageSize}
        sortField: "${obj.sortField}"
        sortOrder: "${obj.sortOrder}"
        searchAccount: "${obj.searchAccount}"
        searchName: "${obj.searchName}"
        searchTel: "${obj.searchTel}"
      ) {
        code
        message
        count
        data {
          id
          createdAt
          account
          name
          sex
          rank
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

export default getMemberList
