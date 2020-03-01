// import request from '@/utils/request-6003.js'
import request from '@/utils/request-6004.js'
// 护理机构列表
export function orgNursingList(data) {
  return request({
    url: `/auth/org/find_nursing_org_list/${data.current}/10`,
    method: 'post',
    data: data.data
  })
}
// 护理培训的列表
export function orgTrainingList(data) {
  return request({
    url: `/auth/org/find_training_org_list/${data.current}/10`,
    method: 'post',
    data: data.data
  })
}
// 护理机构全部列表
export function orgAllList(params) {
  return request({
    url: `/auth/org/find_all_nursing_org`,
    method: 'get'
  })
}
export function orgAdd(data) {
  return request({
    url: `/auth/org/insert`,
    method: 'post',
    data
  })
}
export function orgUpdate(data) {
  return request({
    url: `/auth/org/update/${data.orgId}`,
    method: 'put',
    data: data.orgInfo
  })
}
export function orgDelete(data) {
  return request({
    url: `/auth/org/delete/${data.orgId}`,
    method: 'delete'
  })
}

// // 公司管理api
// export function corpPage(params) {
//   return request({
//     url: `/auth/corporation/pagination`,
//     method: 'get',
//     params
//   })
// }
// export function corpList(params) {
//   return request({
//     url: `/auth/corporation/list`,
//     method: 'get',
//     params
//   })
// }
// export function corpEdit(data) {
//   return request({
//     url: `/auth/corporation/save_or_update`,
//     method: 'post',
//     data
//   })
// }
// export function corpDelete(data) {
//   return request({
//     url: `/auth/corporation/delete/${data.id}`,
//     method: 'delete'
//   })
// }
// export function corpInfo1(params) {
//   return request({
//     url: `/auth/corporation/info/${params.id}`,
//     method: 'get'
//   })
// }
// // 角色管理api
// export function roleEdit(data) {
//   return request({
//     url: `/auth/role/save_or_update`,
//     method: 'post',
//     data
//   })
// }
// export function rolePage(params) {
//   return request({
//     url: `/auth/role/pagination`,
//     method: 'get',
//     params
//   })
// }
// export function roleMenuOpts(params) {
//   return request({
//     url: `/auth/role/get_role_menu_opts/${params.roleId}`,
//     method: 'get'
//   })
// }
// export function roleIsExist(params) {
//   return request({
//     url: `/auth/role/is_exist`,
//     method: 'get',
//     params
//   })
// }
// export function roleRemove(params) {
//   return request({
//     url: `/auth/role/remove/${params.id}`,
//     method: 'delete'
//   })
// }
// export function loadAllExtraNames() {
//   return request({
//     url: `/auth/role/load_all_extra_names`,
//     method: 'get'
//   })
// }

// // 用户管理及角色分配
// export function loginUserEdit(data) {
//   return request({
//     url: `/auth/login_user/save_or_update`,
//     method: 'post',
//     data
//   })
// }
// export function getUserRoles(params) {
//   return request({
//     url: `/auth/role/get_user_roles`,
//     method: 'get',
//     params
//   })
// }
// export function loginUserDelete(params) {
//   return request({
//     url: `/auth/login_user/remove`,
//     method: 'delete',
//     params
//   })
// }
// export function loginUserPage(params) {
//   return request({
//     url: `/auth/login_user/pagination`,
//     method: 'get',
//     params
//   })
// }

// // APP用户管理
// export function userMngList(data) {
//   // console.log(data)
//   return request({
//     url: `/auth/staff/find_list/${data.current}/10`,
//     method: 'post',
//     data: data.data
//   })
// }

