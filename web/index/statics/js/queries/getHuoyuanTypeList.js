function getHuoyuanTypeList (obj, callback) {
  let query = {
    query: `{
      getHuoyuanTypeList (is_recommend: ${obj.is_recommend || 0}) {
        code
        message
        data {
          id
          name
          ${
            obj.is_huoyuanList === 1 ? "huoyuanInfos { id title main_img }" : ""
          }
        }
      }
    }`
  }
  return fetch({
    url: '/graphql',
    method: 'get',
    data: query,
    callback
  })
}
