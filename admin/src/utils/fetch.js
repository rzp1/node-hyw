import axios from 'axios'
import { message } from 'antd'
import { getToken, removeToken } from '@/utils/auth'
const { baseURL }  = require('@/configs/config')

let token = getToken()
// 创建axios实例
const fetch = axios.create({
  baseURL
  // timeout: 5000     // 请求超时时间
})

fetch.defaults.headers.common['hyw-from'] = 'admin'

// 这段必须有，否则一刷新，token 就没了
if (token) {
  fetch.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
fetch.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      // 401状态码为过期
      message.error('token过期, 请重新登陆', 3)
      removeToken()
      window.location.href='/login'
      // router.push('/login')
    } else if (res.code === 403) {
      // 403状态码， token验证错误
      message.error('token验证错误', 3)
    } else {
      return response
    }
  },
  error => {
    console.error('拦截器err' + error)
  }
)
export default fetch
