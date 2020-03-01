import request from '@/utils/request-6004.js'

export function addDepartment(data) {
  return request({
    url: '/departments',
    method: 'post',
    data
  })
}

export function updateDepartment(data) {
  return request({
    url: '/departments',
    method: 'put',
    data
  })
}

export function searchDepartment(data) {
  return request({
    url: '/departments/search',
    method: 'post',
    data
  })
}

export function oneDepartment(id) {
  return request({
    url: `/departments/${id}`,
    method: 'get',
    data
  })
}

export function deleteDepartment(id) {
  return request({
    url: `/departments/${id}`,
    method: 'delete'
  })
}

export function departmentToTop(data) {
  return request({
    url: `/departments/placedepartmentattop/${data}`,
    method: 'put'
  })
}

export function departmentCancleTop(data) {
  return request({
    url: `/departments/canceldepartmentattop`,
    method: 'put',
    data
  })
}
