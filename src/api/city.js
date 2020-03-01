import request from '@/utils/request-6004.js'

export function addCity(data) {
  return request({
    url: '/citys',
    method: 'post',
    data
  })
}

export function searchCity(data) {
  return request({
    url: '/citys/search',
    method: 'post',
    data
  })
}

export function deleteCity(id) {
  return request({
    url: `/citys/${id}`,
    method: 'delete'
  })
}
