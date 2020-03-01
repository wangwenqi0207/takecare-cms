// import request from '@/utils/request-6003.js'
import request from '@/utils/request-6004.js'

// 登录api
export function login(data) {
  return request({
    url: `/login`,
    method: 'post',
    // data: JSON.stringify(data),
    data
    // headers: { // 已经在request.js里面进行全局设置，也可以在请求里面局部设置其他headers
    //    'Content-Type': 'application/json;charset=UTF-8'
    // }
  })
}
// 公司管理api
export function corpPage(params) {
  return request({
    url: `/auth/corporation/pagination`,
    method: 'get',
    params
  })
}
export function corpList(params) {
  return request({
    url: `/auth/corporation/list`,
    method: 'get',
    params
  })
}
export function corpEdit(data) {
  return request({
    url: `/auth/corporation/save_or_update`,
    method: 'post',
    data
  })
}
export function corpDelete(data) {
  return request({
    url: `/auth/corporation/delete/${data.id}`,
    method: 'delete'
  })
}
export function corpInfo1(params) {
  return request({
    url: `/auth/corporation/info/${params.id}`,
    method: 'get'
  })
}
// 角色管理api
export function roleEdit(data) {
  return request({
    url: `/auth/role/save_or_update`,
    method: 'post',
    data
  })
}
export function rolePage(params) {
  return request({
    url: `/auth/role/pagination`,
    method: 'get',
    params
  })
}
export function roleMenuOpts(params) {
  return request({
    url: `/auth/role/get_role_menu_opts/${params.roleId}`,
    method: 'get'
  })
}
export function roleIsExist(params) {
  return request({
    url: `/auth/role/is_exist`,
    method: 'get',
    params
  })
}
export function roleRemove(params) {
  return request({
    url: `/auth/role/remove/${params.id}`,
    method: 'delete'
  })
}
export function loadAllExtraNames() {
  return request({
    url: `/auth/role/load_all_extra_names`,
    method: 'get'
  })
}

// 用户管理及角色分配
export function loginUserEdit(data) {
  return request({
    url: `/auth/login_user/save_or_update`,
    method: 'post',
    data
  })
}
export function getUserRoles(params) {
  return request({
    url: `/auth/role/get_user_roles`,
    method: 'get',
    params
  })
}
export function loginUserDelete(params) {
  return request({
    url: `/auth/login_user/remove`,
    method: 'delete',
    params
  })
}
export function loginUserPage(params) {
  return request({
    url: `/auth/login_user/pagination`,
    method: 'get',
    params
  })
}

// APP用户管理
export function userMngList(data) {
  // console.log(data)
  return request({
    url: `/auth/user_mng/find_list/${data.current}/10`,
    method: 'post',
    data: data.data
  })
}
export function userIsRegister(params) {
  // console.log(data)
  return request({
    url: `/auth/user_mng/is_register/${params.phoneNum}`,
    method: 'get'
  })
}
export function userRegister(data) {
  // console.log(data)
  return request({
    url: `/auth/user_mng/insert`,
    method: 'post',
    data
  })
}
export function userDelete(data) {
  // console.log(data)
  return request({
    url: `/auth/user_mng/delete/${data.userId}`,
    method: 'delete'
  })
}
export function userUpdate(data) {
  // console.log(data)
  return request({
    url: `/auth/user_mng/update/${data.userId}`,
    method: 'put',
    data: data.userInfo
  })
}
