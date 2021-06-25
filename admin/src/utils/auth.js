
const getToken = () => {
  return sessionStorage.getItem('token') || localStorage.getItem('token')
}

const setToken = (token) => {
  localStorage.setItem('token', token)
  sessionStorage.setItem('token', token)
}
const removeToken = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
}

export { getToken, setToken, removeToken }
