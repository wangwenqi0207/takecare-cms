import request from '@/utils/request-6004.js'
export function staffAdd(data) {
  return request({
    url: '/staff',
    method: 'post',
    data
  })
}
export function staffSearch(data) {
  return request({
    url: '/staff/search',
    method: 'post',
    data
  })
}
export function staffInfo(id) {
  return request({
    url: `/staff/${id}`,
    method: 'get'
  })
}
export function staffUpdate(data) {
  return request({
    url: `/staff`,
    method: 'put',
    data: data
  })
}
export function staffDelete(data) {
  return request({
    url: `/staff/${data.id}`,
    method: 'delete'
  })
}
export function approve(id) {
  return request({
    url: `/staff/${id}/approve`,
    method: 'post'
  })
}
export function refusetopass(data) {
  return request({
    // headers: { // 已经在request.js里面进行全局设置，也可以在请求里面局部设置其他headers
    //   'Content-Type': 'application/json;charset=UTF-8'
    // },
    url: `/staff/${data.id}/refusetopass?refusalOfReason=${data.refusalOfReason}`,
    method: 'post'
  })
}
