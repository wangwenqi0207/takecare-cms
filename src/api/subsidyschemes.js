import request from '@/utils/request-6004.js'
export function policyAdd(data) {
  return request({
    url: '/subsidyschemes/add',
    method: 'post',
    data
  })
}
export function policySearch(data) {
  return request({
    url: '/subsidyschemes/search',
    method: 'post',
    data
  })
}
export function getPolicyInfo(params) {
  return request({
    url: `/subsidyschemes/${params.id}`,
    method: 'get'
  })
}
export function policyUpdate(data) {
  return request({
    url: `/subsidyschemes/${data.id}`,
    method: 'put',
    data: data.operationRequest
  })
}
export function policyDelete(data) {
  return request({
    url: `/subsidyschemes/${data.id}`,
    method: 'delete'
  })
}
