import request from '@/utils/request-6004.js'
export function orgAdd(data) {
  return request({
    url: '/organizations',
    method: 'post',
    data
  })
}
export function orgSearch(data) {
  return request({
    url: '/organizations/search',
    method: 'post',
    data
  })
}
export function orgInfo(params) {
  return request({
    url: `/organizations/${params.id}`,
    method: 'get'
  })
}
export function orgUpdate(data) {
  return request({
    url: `/organizations`,
    method: 'put',
    data: data
  })
}
export function orgDelete(data) {
  return request({
    url: `/organizations/${data.id}`,
    method: 'delete'
  })
}
