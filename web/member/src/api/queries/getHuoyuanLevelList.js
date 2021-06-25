import fetch from '@/utils/fetch'

const getHuoyuanLevelList = (token) => {
  let query = {
    query: `{
      getHuoyuanLevelList {
        code
        message
        data {
          id
          name
          money
          time
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

export default getHuoyuanLevelList
