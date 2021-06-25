import fetch from '@/utils/fetch'

const getHuoyuanInfoList = (obj) => {
  let query = {
    query: `{
      getHuoyuanInfoList (
        page: ${obj.current}
        limit: ${obj.pageSize}
        recommended_type: ${ obj.recommended_type || 0 }
        sortField: "${obj.sortField}"
        sortOrder: "${obj.sortOrder}"
        keys: "${obj.keys} || ''"
        status: ${obj.status || 0}
        member_id: ${obj.member_id || 0}
        type: 3
      ) {
        code
        message
        count
        data {
          id
          title
          type_text
          status
          createdAt
          recommended_type
          popularity
          is_delete
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

export default getHuoyuanInfoList
