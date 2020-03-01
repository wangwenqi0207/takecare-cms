import request from '@/utils/request-6004'

export function goodsList(data) {
  return request({
    url: '/product/search',
    method: 'post',
    data
  })
}

export function searchData(data) {
  return request({
    url: '/product/search',
    method: 'post',
    data
  })
}
export function upGoods(data) {
  return request({
    url: '/product/up',
    method: 'post',
    data
  })
}
export function downGoods(data) {
  return request({
    url: '/product/down',
    method: 'post',
    data
  })
}
export function deleteGoods(params) {
  return request({
    url: `/product/${params}`,
    method: 'delete'
  })
}
export function submitGoods(data) {
  return request({
    url: '/product/add',
    method: 'post',
    data
  })
}
export function updateGoods(data) {
  return request({
    url: `/product/${data.id}`,
    method: 'put',
    data
  })
}
export function searchOneGood(params) {
  return request({
    url: `/product/${params}`,
    method: 'get'
  })
}

export function organizationsList(data) {
  return request({
    url: `/organizations/search`,
    method: 'post',
    data
  })
}

// 运营管理--》价格管理
export function searchforpriceData(data) {
  return request({
    url: '/product/searchforprice',
    method: 'post',
    data
  })
}
export function getpricebyproductids(data) {
  return request({
    url: `/standardprices/getpricebyproductids`,
    method: 'post',
    data
  })
}
// 新增设置价格
export function createprice(data) {
  return request({
    url: `/standardprices/createprice`,
    method: 'post',
    data
  })
}
// 修改标准价格（城市价格）
export function updatePromotionprices(data) {
  return request({
    url: `/promotionprices`,
    method: 'put',
    data
  })
}
// 修改促销价格（活动/政策补贴价格）
export function updateStandardprices(data) {
  return request({
    url: `/standardprices`,
    method: 'put',
    data
  })
}
// 删除活动政策补贴价格
export function deletePromotionprices(data) {
  return request({
    url: `/promotionprices/${data.id}`,
    method: 'delete'
  })
}

