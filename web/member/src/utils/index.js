const getApiUrl = () => {
  // console.log('process.env in getApiUrl', process.env)
  // let urlconfig = {
  //   'development': config.dev.env.API_URL,
  //   'testing': config.test.env.API_URL,
  //   'production': config.build.env.API_URL
  // }
  // let env = process.env.NODE_ENV || 'development'
  // let apiUrl = JSON.parse(urlconfig[env])
  let apiUrl = process.env.API_URL
  return apiUrl
}
