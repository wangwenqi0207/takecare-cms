// import request from '@/utils/request'
import request from '@/utils/request-6004'

export function creadEmployee(params) {
  return request({
    url: '/employee/list',
    method: 'get',
    params
  })
}

export function loadByOrgType(params) {
  return request({
    url: '/auth/org/find_all_nursing_org',
    method: 'get'
  })
}
export function employeeList(data) {
  const resData = JSON.parse(JSON.stringify(data))
  delete resData.current
  delete resData.size
  for (var index in resData) {
    if (resData[index] == '') {
      delete resData[index]
    }
  }
  return request({
    url: `/auth/personnel/find_list/${data.current}/${data.size}`,
    method: 'post',
    data: resData
  })
}

export function saveEmployee(data) {
  return request({
    url: `/auth/personnel/insert`,
    method: 'post',
    data
  })
}
export function updateEmployee(data) {
  return request({
    url: `/auth/personnel/update/${data.userId}`,
    method: 'put',
    data
  })
}
export function deleteEmployee(data) {
  return request({
    url: `/auth/personnel/delete/${data.userId}`,
    method: 'delete'
  })
}
