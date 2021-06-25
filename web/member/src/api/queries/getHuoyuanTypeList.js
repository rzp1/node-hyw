import fetch from '@/utils/fetch'

const getHuoyuanTypeList = (is_recommend) => {
  let query = {
    query: `{
      getHuoyuanTypeList (
        is_recommend: ${is_recommend || 0}
      ) {
        code
        message
        data {
          id
          name
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

export default getHuoyuanTypeList
