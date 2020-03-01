import request from '@/utils/request-6004.js'

export function orderSearch(data) {
  return request({
    url: `/orders/search`,
    method: 'post',
    data
  })
}
export function getOrderInfo(params) {
  return request({
    url: `/orders/${params.id}`,
    method: 'get'
  })
}
export function orderUpdate(data) {
  return request({
    url: `/orders/${data.id}`,
    method: 'put',
    data: data.operationRequest
  })
}
export function orderDelete(data) {
  return request({
    url: `/orders/${data.id}`,
    method: 'delete'
  })
}
// 订单状态操作
export function adminConfirmOrder6002(data) {
  return request({
    url: `/orders/${data.id}/adminconfirmorder`,
    method: 'put',
    data: data.data
  })
}
export function assignStaff6002(data) {
  return request({
    url: `/orders/${data.id}/assignstaff`,
    method: 'put',
    data: data.data
  })
}
export function fillInLogisticsInfo6002(data) {
  return request({
    url: `/orders/${data.id}/filldeliverylogistics`,
    method: 'put',
    data: data.data
  })
}
export function cancelOrder6002(data) {
  return request({
    url: `/orders/cancelorder`,
    method: 'put',
    data
  })
}
export function conformRefund6002(data) {
  return request({
    url: `/orders/${data.id}/confirmrefund`,
    method: 'put',
    data: data.data
  })
}
// 支付宝退款
export function AlipayRefund(data) {
  return request({
    url: `/alipay/refund`,
    method: 'post',
    data
  })
}
export function fillCheckInInfo6002(data) {
  return request({
    url: `/orders/${data.id}/fillcheckininformation`,
    method: 'put',
    data: data.data
  })
}
export function assignOrgToService6002(data) {
  return request({
    url: `/orders/${data.id}/assignorganization`,
    method: 'put',
    data: data.data
  })
}

