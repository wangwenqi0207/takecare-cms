export default function permissionData(value) {
  // 权限相关
  var userRolesPer = JSON.parse(window.localStorage.getItem('userRolesPer'))
  var ObjData = {}
  // console.log(userRolesPer)
  if (userRolesPer) {
    userRolesPer.map(item => {
      if (item.name == value) {
        item.resourcePermission.map(item1 => {
          ObjData[item1.name] = item1.checked
        })
      }
    })
    return ObjData
  } else {
    return ObjData
  }
}
