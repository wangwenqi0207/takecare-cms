import request from '@/utils/request-6004.js'
// 查询App用户列表
export function appUserSearch(data) {
  return request({
    url: '/userprofiles/search',
    method: 'post',
    data
  })
}
export function appUserInfo(params) {
  return request({
    url: `/userprofiles/${params.id}`,
    method: 'get'
  })
}
export function appUserUpdate(data) {
  return request({
    url: `/userprofiles`,
    method: 'put',
    data
  })
}
export function appUserAdd(data) {
  return request({
    url: `/userprofiles`,
    method: 'post',
    data
  })
}
export function appUserDelete(data) {
  return request({
    url: `/userprofiles/${data.id}`,
    method: 'delete'
  })
}
// App用户加入黑名单
export function putonblacklist(data) {
  return request({
    url: `/userprofiles/putonblacklist`,
    method: 'put',
    data
  })
}
// App用户取消黑名单
export function cancelputonblacklist(data) {
  return request({
    url: `/userprofiles/${data.userId}/cancelputonblacklist`,
    method: 'put'
  })
}
// 查询员工列表
export function employeeSearch(data) {
  return request({
    url: '/employees/search',
    method: 'post',
    data
  })
}
export function employeeInfo(params) {
  return request({
    url: `/employees/${params.id}`,
    method: 'get'
  })
}
export function employeeUpdate(data) {
  return request({
    url: `/employees`,
    method: 'put',
    data
  })
}
export function employeeDelete(data) {
  return request({
    url: `/employees/${data.id}`,
    method: 'delete'
  })
}
export function employeeAdd(data) {
  return request({
    url: `/employees`,
    method: 'post',
    data
  })
}
// Permission:资源(比如订单模块，商品模块)
export function permissionsSearch(data) {
  return request({
    url: '/permissions/search',
    method: 'post',
    data
  })
}
// Resource:操作(比如订单添加，商品修改)
export function resourcesSearch(data) {
  if (data.XToken) {
    var data1 = JSON.parse(JSON.stringify(data))
    delete data1.XToken
    return request({
      url: '/resources/search',
      method: 'post',
      data: data1,
      headers: { // 已经在request.js里面进行全局设置，也可以在请求里面局部设置其他headers
        'Authorization': 'Bearer ' + data.XToken
      }
    })
  } else {
    return request({
      url: '/resources/search',
      method: 'post',
      data
    })
  }
  // return request({
  //   url: '/resources/search',
  //   method: 'post',
  //   data
  // })
}
// Resource信息
export function resourcesInfo(params) {
  return request({
    url: `/resources/${params.id}`,
    method: 'get'
  })
}
// 新增Resource
export function resourcesCreate(data) {
  return request({
    url: `/resources`,
    method: 'post',
    data
  })
}
// 修改Resource
export function resourcesUpdate(data) {
  return request({
    url: `/resources`,
    method: 'put',
    data
  })
}
// 删除Resource
export function resourcesDelete(data) {
  return request({
    url: `/resources/${data.id}`,
    method: 'delete'
  })
}
// // User: 用户
// // 用户登录
// export function authLogin(data) {
//   return request({
//     url: '/authApi/users/authenticate',
//     method: 'post',
//     data
//   })
// }
// export function putPassword(data) {
//   return request({
//     url: '/authApi/users/password',
//     method: 'put',
//     data
//   })
// }
// UserClaim:用户权限
// UserRole:用户角色

// 收货地址相关
export function addressSearch(data) {
  return request({
    url: '/shippingaddresss/search',
    method: 'post',
    data
  })
}
export function addressAdd(data) {
  return request({
    url: '/shippingaddresss',
    method: 'post',
    data
  })
}
export function addressInfo(params) {
  return request({
    url: `/shippingaddresss/${params.id}`,
    method: 'get'
  })
}
export function addressUpdate(data) {
  return request({
    url: `/shippingaddresss`,
    method: 'put',
    data
  })
}
export function addressDelete(data) {
  return request({
    url: `/shippingaddresss/${data.id}`,
    method: 'delete'
  })
}
// 关注的人列表
export function concernSearch(data) {
  return request({
    url: '/followrelations/search',
    method: 'post',
    data
  })
}
export function concernAdd(data) {
  return request({
    url: '/followrelations',
    method: 'post',
    data
  })
}
export function concernInfo(params) {
  return request({
    url: `/followrelations/${params.id}`,
    method: 'get'
  })
}
export function concernUpdate(data) {
  return request({
    url: `/followrelations`,
    method: 'put',
    data
  })
}
export function concernDelete(data) {
  return request({
    url: `/followrelations/${data.id}`,
    method: 'delete'
  })
}
// Role：角色（比如系统管理员，订单管理员，商品管理员）
// 角色权限角色相关
export function rolesSearch(data) {
  return request({
    url: '/roles/search',
    method: 'post',
    data
  })
}
export function rolesAdd(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}
export function rolesInfo(params) {
  return request({
    url: `/roles/${params.id}`,
    method: 'get'
  })
}
export function rolesUpdate(data) {
  return request({
    url: `/roles`,
    method: 'put',
    data
  })
}
export function rolesDelete(data) {
  return request({
    url: `/roles/${data.id}`,
    method: 'delete'
  })
}

// 员工管理新增和修改时的账号权限设置
// 创建账号权限
export function userrolesCreate(data) {
  return request({
    url: `/userroles`,
    method: 'post',
    data
  })
}
// 修改账号权限
export function userrolesUpdate(data) {
  return request({
    url: `/userroles`,
    method: 'put',
    data
  })
}
// 社区管理用到
export function allUser(data) {
  return request({
    url: '/userprofiles/search',
    method: 'post',
    data
  })
}
