import request from '@/utils/request-6008.js'
// User: 用户
// 用户登录
export function authLogin(data) {
  return request({
    url: '/users/authenticate',
    method: 'post',
    data
  })
}
export function putPassword(data) {
  return request({
    url: '/users/password',
    method: 'put',
    data
  })
}
// 获取新的token
export function refreshToken(params) {
  return request({
    url: `/users/refresh/${params.token}`,
    method: 'get'
  })
}
// 实名认证接口
export function getuseridcard(params) {
  return request({
    url: `/users/getuseridcard?UserId=${params.userId}&IdCard=${params.identityCard}&LastName=${params.lastName}&FirstName=${params.firstName}`,
    method: 'get'
  })
}
