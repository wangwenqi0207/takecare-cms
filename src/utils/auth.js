import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getTokenLocal() {
  return window.localStorage.getItem('accessToken')
}
// export function getRouteLocal() {
//   return window.localStorage.getItem('testRouter')
// }

// export function setTokenLocal(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeTokenLocal() {
//   return Cookies.remove(TokenKey)
// }
