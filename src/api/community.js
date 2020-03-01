import request from '@/utils/request-6006.js'

// 护理机构列表
export function communitySearch(data) {
  return request({
    url: `/community/search`,
    method: 'post',
    data: data
  })
}

export function getCommunity(data) {
  return request({
    url: `/community/${data.id}`,
    method: 'get',
    data
  })
}
export function putCommunity(data) {
  return request({
    url: `/community/${data.data.id}`,
    method: 'put',
    data
  })
}
export function deleteCommunity(data) {
  return request({
    url: `/community/${data.id}`,
    method: 'delete'
  })
}

export function addCommunity(data) {
  return request({
    url: `/community/add`,
    method: 'post',
    data
  })
}

// 公告
export function annSearch(data) {
  return request({
    url: `/communityannouncement/search`,
    method: 'post',
    data
  })
}
export function annAdd(data) {
  return request({
    url: `/communityannouncement/add`,
    method: 'post',
    data
  })
}
export function annDelete(data) {
  return request({
    url: `/communityannouncement/${data.id}`,
    method: 'delete',
    data
  })
}

// 成员
export function memberSearch(data) {
  return request({
    url: `/communitymember/search`,
    method: 'post',
    data
  })
}

export function memberShutup(data) {
  return request({
    url: `/communitymember/${data.id}/shutup`,
    method: 'post',
    data
  })
}

export function cancelShutup(data) {
  return request({
    url: `/communitymember/${data.id}/cancelshutup`,
    method: 'post',
    data
  })
}

export function addBlacklist(data) {
  return request({
    url: `/blacklist/${data.id}/add`,
    method: 'post',
    data
  })
}

export function searchBlacklist(data) {
  return request({
    url: `/blacklist/search`,
    method: 'post',
    data
  })
}

export function cancelBlacklist(data) {
  return request({
    url: `/blacklist/${data.id}/cancel`,
    method: 'post',
    data
  })
}

export function deleteCommunitymember(data) {
  return request({
    url: `/communitymember/${data.id}`,
    method: 'delete',
    data
  })
}

// 包含小区
export function residentialArea(data) {
  return request({
    url: `/residentialarea/search`,
    method: 'post',
    data
  })
}

export function AreaAdd(data) {
  return request({
    url: `/residentialarea/add`,
    method: 'post',
    data
  })
}

export function AreaRemove(data) {
  return request({
    url: `/residentialarea/${data.id}`,
    method: 'delete',
    data
  })
}

// 聊天记录
export function chatlogList(data) {
  return request({
    url: `/communitychatlog/search`,
    method: 'post',
    data
  })
}

export function chatlogRemove(data) {
  return request({
    url: `/communitychatlog/${data.id}`,
    method: 'delete',
    data
  })
}

// 社区申请
export function applSearch(data) {
  return request({
    url: `/communityapplication/search`,
    method: 'post',
    data
  })
}

export function agreeApply(data) {
  return request({
    url: `/communityapplication/${data.id}/approve`,
    method: 'post',
    data
  })
}

export function refuseApply(data) {
  return request({
    url: `/communityapplication/${data.id}/refuse`,
    method: 'post',
    data
  })
}
// 获取用户所在社区
export function usercommunitymemberlist(data) {
  return request({
    url: `/communitymember/${data.id}/usercommunitymemberlist`,
    method: 'post',
    data: data.data
  })
}

