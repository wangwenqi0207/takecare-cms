<template>
  <div
    style="width:100%;height:100%;padding:60px 0px;box-sizing:border-box;
-moz-box-sizing:border-box;
-webkit-box-sizing:border-box;background:#fff;"
  >
    <div id="login" class="login" :style="{backgroundImage: 'url(' + bg2 + ')'}">
      <div class="login-bg">
        <div class="login-container">
          <div class="login-header">
            <div class="brand">
              <div style="font-size:30px;color:#409EFF;">我来照顾运营管理平台</div>
              <!-- <img
            alt     = "logo"
            src     = "@/assets/img/jingbanlogo.png"
            width   = "330"
            preview = '0'
            style   = "cursor:pointer"
          > -->
            </div>
          </div>
          <div class="login-content">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
              <div class="form-group m-b-20">
                <el-form-item prop="username">
                  <el-input
                    id="loginName"
                    v-model="loginForm.username"
                    type="text"
                    class="form-control input-lg"
                    placeholder="登录账号"
                    name="loginName"
                    maxlength="100"
                    value=""
                  />
                </el-form-item>
              </div>
              <div class="form-group m-b-20">
                <el-form-item prop="password">
                  <el-input
                    id="loginPwd"
                    v-model="loginForm.password"
                    type="password"
                    class="form-control input-lg"
                    placeholder="密码"
                    name="loginPwd"
                    maxlength="20"
                  />
                </el-form-item>
              </div>
              <div class="checkbox m-b-20">
                <label>
                  <input
                    v-model="loginForm.checked"
                    type="checkbox"
                    name="remember"
                    value="1"
                    checked="checked"
                  > <span />记住我(下回可自动登录)
                </label>
                <span id="err_span" style="color:red;width:100%;height:30px;font-size:16px;" />
                <!-- <span
              style = "color: red"
              id    = "err_span"
            ></span> -->
              </div>
              <div class="login-buttons">
                <el-button
                  id="submitFinal"
                  :loading="loading"
                  type="primary"
                  class="btn btn-success btn-block btn-lg"
                  @click.native.prevent="handleLogin"
                >登录</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import api2 from '@/resource/api2.js'
import api3 from '@/resource/api3.js'
import { resourcesSearch } from '@/api/auth'
import { authLogin } from '@/api/login'
import Cookies from 'js-cookie'
import Bg2 from '@/assets/login.png'
import { offset } from '@/utils/offset'
import { Debounce } from '@/utils/public'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        checked: true
      },
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      // },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入登录名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入登录密码' }]
      },
      bg2: Bg2,
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      publicPath: process.env.BASE_URL,
      // 权限明细表格
      tableData: []
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    if (window.localStorage.getItem('testRouter')) {
      window.localStorage.removeItem('testRouter')
      location.reload()
      // this.reload();
    }
    if (window.localStorage.getItem('userInfo')) {
      window.localStorage.removeItem('userInfo')
    }
    if (window.localStorage.getItem('accessToken')) {
      window.localStorage.removeItem('accessToken')
    }
    if (window.localStorage.getItem('refreshToken')) {
      window.localStorage.removeItem('refreshToken')
    }
    if (window.localStorage.getItem('userRolesPer')) {
      window.localStorage.removeItem('userRolesPer')
    }
  },
  methods: {
    // 权限明细展示
    forTree(treeList) {
      // 递归遍历树形结构
      for (var i = 0; i < treeList.length; i++) { // 循环遍历树
        treeList[i].checked = false
        if (treeList[i].resourcePermission) {
          // 如果遍历树结构还有下一级-做操作
          this.forTree(treeList[i].resourcePermission)
        } else {
          // 如果没有下一级做相应操作
          // return i.checked = false;
        }
      }
      return treeList
    },
    // getResourceData() {
    //   resourcesSearch({
    //     'numberPerPage': 100,
    //     'currentPage': 1,
    //     'sortList': [
    //       {
    //         'columnName': 'Id',
    //         'sortOrder': 0
    //       }
    //     ]
    //   }).then(res => {
    //     if (res) {
    //       var treeList = res.data
    //       var data = this.forTree(treeList)
    //       // 深拷贝与浅拷贝问题，此处需要深拷贝
    //       //   console.log(data)
    //       this.tableData = data
    //     } else {
    //       this.$message({
    //         type: 'warning',
    //         message: '请求权限数据失败'
    //       })
    //     }
    //   })
    // },
    handleLogin: Debounce(function() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          authLogin({ 'username': this.loginForm.username, 'password': this.loginForm.password, 'remember': this.loginForm.checked ? 1 : 0 }).then(res => {
            // console.log(res)
            if (res) {
              // console.log(res.userRoles)
              var roleClaimsList = []
              var newrRoleClaimsList = []
              if (res.userRoles.length) {
                res.userRoles.map(item => {
                  if (item.role.roleClaims) {
                    item.role.roleClaims.map(item1 => {
                      roleClaimsList.push(item1)
                    })
                  }
                })
              }
              // 如果选了不同的角色，权限明细可能会有重复，去重
              $.each(roleClaimsList, function(i, v) {
                var flag = true
                if (newrRoleClaimsList.length > 0) {
                  $.each(newrRoleClaimsList, function(n, m) {
                    if (newrRoleClaimsList[n].claimType == roleClaimsList[i].claimType && newrRoleClaimsList[n].claimValue == roleClaimsList[i].claimValue) { flag = false }
                  })
                }
                if (flag) {
                  newrRoleClaimsList.push(roleClaimsList[i])
                }
              })
              resourcesSearch({
                'numberPerPage': 100,
                'currentPage': 1,
                'sortList': [
                  {
                    'columnName': 'Id',
                    'sortOrder': 0
                  }
                ],
                'XToken': res.user.accessToken
              }).then(res1 => {
                if (res1) {
                  var treeList = res1.data
                  var data = this.forTree(treeList)
                  // 深拷贝与浅拷贝问题，此处需要深拷贝
                  //   console.log(data)
                  this.tableData = data
                  this.$nextTick(() => {
                    for (var i = 0; i < newrRoleClaimsList.length; i++) {
                      var currentClaims = newrRoleClaimsList[i]
                      for (var j = 0; j < this.tableData.length; j++) {
                        var currentTableItem = this.tableData[j]
                        if (currentTableItem.name == currentClaims.claimType) {
                          for (var g = 0; g < currentTableItem.resourcePermission.length; g++) {
                            var currentPerItem = currentTableItem.resourcePermission[g]
                            if (currentPerItem.name == currentClaims.claimValue) {
                              currentPerItem.checked = true
                              currentTableItem.checked = true
                              // currentPerItem.id = currentClaims.id
                            }
                          }
                        }
                      }
                    }
                    // 此时的this.tableData里面包含了所有的模块和操作权限，并以checked属性的true，false表示有没有勾选其权限
                    // 深拷贝和浅拷贝问题，此时的两份this.tableData需要深拷贝
                    // console.log(this.tableData)
                    // 由于存储之前并没有进行修改操作，所有后期的修改不影响已经存储的内容，不用考虑深拷贝
                    window.localStorage.setItem('userRolesPer', JSON.stringify(JSON.parse(JSON.stringify(this.tableData))))
                    // 几个特殊的三级菜单，做特殊处理，如果被勾选的话将其名称改为其对应的二级菜单名称
                    for (var i = 0; i < this.tableData.length; i++) {
                      var item = this.tableData[i]
                      if (item.checked) {
                        if (item.name == '员工账号' || item.name == '代理人账号' || item.name == '部门设置' || item.name == '角色权限设置' || item.name == '城市管理') {
                          // console.log('6666666666')
                          item.name = '员工管理'
                        }
                        if (item.name == '用户列表' || item.name == '用户列表黑名单') {
                          item.name = '用户管理'
                        }
                        if (item.name == '全部护理人员' || item.name == '待审核护理人员' || item.name == '审核通过护理人员' || item.name == '审核未通过护理人员') {
                          item.name = '护理人员'
                        }
                      }
                    }
                    // console.log('33', this.tableData)
                    // console.log(api2.treelist)
                    var treeList = JSON.parse(JSON.stringify(api2.treelist))
                    var treeListCopy = JSON.parse(JSON.stringify(api2.treelist))
                    // 将获取的权限数据与事先存储好的路由进行匹配，有权限的让对应路由hidden变为false
                    // 事先一级二级路由都设置为hidden为true
                    // 这种有一弊端，就是所有路由都是在的只是隐藏了，如果在地址栏直接输入路径还是可以进入的
                    // for (var i = 0; i < treeList.length; i++) {
                    //   var currentTreeData = treeList[i]
                    //   var currentTreeItem = treeList[i].children
                    //   for (var j = 0; j < currentTreeItem.length; j++) {
                    //     var treePerItem = currentTreeItem[j]
                    //     for (var g = 0; g < this.tableData.length; g++) {
                    //       var tableItem = this.tableData[g]
                    //       if (tableItem.checked && treePerItem.name == tableItem.name) {
                    //         treePerItem['hidden'] = false
                    //         currentTreeData['hidden'] = false
                    //       }
                    //     }
                    //   }
                    // }

                    // 为解决上述问题
                    // 尝试可否把已勾选的留下（二级及其以下的内容保留），没有勾选的对象删除（二级及其以下的内容删除）
                    // 先遍历一遍将所有二级路由的名称与已经勾选的做对比，得到所有没有被勾选的二级路由名称
                    // 在遍历一遍将所有二级路由不存在的二级对象及其下属内容删除掉，得到所有被勾选的路由菜单和空的一级菜单
                    // 再整体遍历，如果一级对象下二级对象不存在，也删除一级对象
                    // 得到所有勾选的二级路由菜单的名称集合
                    var secondRouteList = []
                    for (var g = 0; g < this.tableData.length; g++) {
                      if (this.tableData[g].checked) {
                        secondRouteList.push(this.tableData[g].name)
                      }
                    }
                    // 得到所有没有被勾选的二级路由菜单名称集合
                    var NoSecondRouteList = []
                    for (var i = 0; i < treeList.length; i++) {
                      var currentTreeData = treeList[i]
                      var currentTreeItem = treeList[i].children
                      for (var j = 0; j < currentTreeItem.length; j++) {
                        var treePerItem = currentTreeItem[j]
                        var currentPerName = currentTreeItem[j].name
                        if (secondRouteList.indexOf(currentPerName) == -1) {
                          // currentTreeItem.splice(j,1)
                          NoSecondRouteList.push(currentPerName)
                        }
                      }
                    }
                    // 循环遍历将没有勾选的二级路由及其子路由删除
                    for (var i = 0; i < treeList.length; i++) {
                      var currentTreeData = treeList[i]
                      var currentTreeItem = treeList[i].children
                      for (var j = 0; j < currentTreeItem.length; j++) {
                        var treePerItem = currentTreeItem[j]
                        var currentPerName = currentTreeItem[j].name
                        if (currentPerName != '账号信息' && currentPerName != '修改密码') {
                          if (NoSecondRouteList.indexOf(currentPerName) != -1) {
                            // 从新数组里面删除，否者会影响正在循环的数组编号
                            treeListCopy[i].children.forEach((value, index, array) => {
                              if (value.name == currentPerName) {
                                // 1.要用delete删除，如果用splice删除会导致索引不准，删除数据出现偏差
                                // 但是delete删除会保留位置
                                // delete treeListCopy[i].children[index]
                                // 2.splice删除之后要长度减一
                                treeListCopy[i].children.splice(index, 1)
                                index = index - 1
                              }
                            })
                          }
                        }
                      }
                    }
                    // 最后遍历删除过二级菜单的数组，如果一级菜单下没有任何二级菜单，将一级菜单也删除
                    for (var i = 0; i < treeListCopy.length; i++) {
                      var copyTreeItem = treeListCopy[i].children
                      // 如果前面用delete删除
                      // for(var j = 0 ;j<copyTreeItem.length;j++){
                      //   if(copyTreeItem[j] == "" || copyTreeItem[j] == null){
                      //     copyTreeItem.splice(j,1);
                      //     j= j-1;
                      //   }
                      // }
                      if (!copyTreeItem.length) {
                        // delete treeListCopy[i]
                        treeListCopy.splice(i, 1)
                        i = i - 1
                      }
                    }
                    // 除了默认存在的路由所占长度外如账号信息，还要有额外路由才能进入系统，大于的长度动态调节
                    if (treeListCopy && treeListCopy.length > 1) {
                      // console.log(treeListCopy,treeList,NoSecondRouteList)
                      // // console.log('66', treeList)
                      window.localStorage.setItem('userInfo', JSON.stringify(res))
                      window.localStorage.setItem('refreshToken', res.user.refreshToken)
                      window.localStorage.setItem('accessToken', res.user.accessToken)
                      // 本地登录数据api
                      window.localStorage.setItem('testRouter', JSON.stringify(treeListCopy))
                      this.$message({
                        message: '登录成功',
                        type: 'success'
                      })
                      this.$router.push({ path: '/index' })
                    } else {
                      this.$message({
                        message: '登录失败',
                        type: 'warning'
                      })
                      this.$router.push({ path: '/' })
                    }
                  })
                } else {
                  this.$message({
                    type: 'warning',
                    message: '请求权限数据失败'
                  })
                }
              })

              // window.localStorage.setItem('userInfo', JSON.stringify(res))
              // window.localStorage.setItem('refreshToken', res.user.refreshToken)
              // window.localStorage.setItem('accessToken', res.user.accessToken)
              // // // 本地登录数据api
              // var abb = api3.treelist
              // window.localStorage.setItem('testRouter', JSON.stringify(abb))
              // if (abb && abb.length > 0) {
              //   this.$message({
              //     message: '登录成功',
              //     type: 'success'
              //   })
              //   this.$router.push({ path: '/index' })
              // } else {
              //   this.$message({
              //     message: '登录失败',
              //     type: 'warning'
              //   })
              //   this.$router.push({ path: '/' })
              // }
            }
          })

          // // window.localStorage.setItem('userInfo', JSON.stringify(res))
          // // window.localStorage.setItem('refreshToken', res.user.refreshToken)
          // // window.localStorage.setItem('accessToken', res.user.accessToken)
          // // 本地登录数据api
          // var abb = api3.treelist
          // window.localStorage.setItem('testRouter', JSON.stringify(abb))
          // console.log(abb)
          // if (abb && abb.length > 0) {
          //   this.$router.push({ path: '/index' })
          // } else {
          //   this.$router.push({ path: '/' })
          // }

          this.loading = false
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'warning'
          })
          return false
        }
      })
    }, 500),
    handleLogin1() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          authLogin({ 'username': this.loginForm.username, 'password': this.loginForm.password, 'remember': this.loginForm.checked ? 1 : 0 }).then(res => {
            // console.log(res)
            if (res) {
              // console.log(res.userRoles)
              var roleClaimsList = []
              var newrRoleClaimsList = []
              if (res.userRoles.length) {
                res.userRoles.map(item => {
                  if (item.role.roleClaims) {
                    item.role.roleClaims.map(item1 => {
                      roleClaimsList.push(item1)
                    })
                  }
                })
              }
              // 如果选了不同的角色，权限明细可能会有重复，去重
              $.each(roleClaimsList, function(i, v) {
                var flag = true
                if (newrRoleClaimsList.length > 0) {
                  $.each(newrRoleClaimsList, function(n, m) {
                    if (newrRoleClaimsList[n].claimType == roleClaimsList[i].claimType && newrRoleClaimsList[n].claimValue == roleClaimsList[i].claimValue) { flag = false }
                  })
                }
                if (flag) {
                  newrRoleClaimsList.push(roleClaimsList[i])
                }
              })
              resourcesSearch({
                'numberPerPage': 100,
                'currentPage': 1,
                'sortList': [
                  {
                    'columnName': 'Id',
                    'sortOrder': 0
                  }
                ]
              }).then(res1 => {
                if (res1) {
                  var treeList = res1.data
                  var data = this.forTree(treeList)
                  // 深拷贝与浅拷贝问题，此处需要深拷贝
                  //   console.log(data)
                  this.tableData = data
                  this.$nextTick(() => {
                    for (var i = 0; i < newrRoleClaimsList.length; i++) {
                      var currentClaims = newrRoleClaimsList[i]
                      for (var j = 0; j < this.tableData.length; j++) {
                        var currentTableItem = this.tableData[j]
                        if (currentTableItem.name == currentClaims.claimType) {
                          for (var g = 0; g < currentTableItem.resourcePermission.length; g++) {
                            var currentPerItem = currentTableItem.resourcePermission[g]
                            if (currentPerItem.name == currentClaims.claimValue) {
                              currentPerItem.checked = true
                              currentTableItem.checked = true
                              // currentPerItem.id = currentClaims.id
                            }
                          }
                        }
                      }
                    }
                    // 此时的this.tableData里面包含了所有的模块和操作权限，并以checked属性的true，false表示有没有勾选其权限
                    // 深拷贝和浅拷贝问题，此时的两份this.tableData需要深拷贝
                    // console.log(this.tableData)
                    // 由于存储之前并没有进行修改操作，所有后期的修改不影响已经存储的内容，不用考虑深拷贝
                    window.localStorage.setItem('userRolesPer', JSON.stringify(JSON.parse(JSON.stringify(this.tableData))))
                    // 几个特殊的三级菜单，做特殊处理，如果被勾选的话将其名称改为其对应的二级菜单名称
                    for (var i = 0; i < this.tableData.length; i++) {
                      var item = this.tableData[i]
                      if (item.checked) {
                        if (item.name == '员工账号' || item.name == '代理人账号' || item.name == '部门设置' || item.name == '角色权限设置' || item.name == '城市管理') {
                          // console.log('6666666666')
                          item.name = '员工管理'
                        }
                        if (item.name == '用户列表' || item.name == '用户列表黑名单') {
                          item.name = '用户管理'
                        }
                        if (item.name == '全部护理人员' || item.name == '待审核护理人员' || item.name == '审核通过护理人员' || item.name == '审核未通过护理人员') {
                          item.name = '护理人员'
                        }
                      }
                    }
                    // console.log('33', this.tableData)
                    // console.log(api2.treelist)
                    var treeList = JSON.parse(JSON.stringify(api2.treelist))
                    var treeListCopy = JSON.parse(JSON.stringify(api2.treelist))
                    // 将获取的权限数据与事先存储好的路由进行匹配，有权限的让对应路由hidden变为false
                    // 事先一级二级路由都设置为hidden为true
                    // 这种有一弊端，就是所有路由都是在的只是隐藏了，如果在地址栏直接输入路径还是可以进入的
                    // for (var i = 0; i < treeList.length; i++) {
                    //   var currentTreeData = treeList[i]
                    //   var currentTreeItem = treeList[i].children
                    //   for (var j = 0; j < currentTreeItem.length; j++) {
                    //     var treePerItem = currentTreeItem[j]
                    //     for (var g = 0; g < this.tableData.length; g++) {
                    //       var tableItem = this.tableData[g]
                    //       if (tableItem.checked && treePerItem.name == tableItem.name) {
                    //         treePerItem['hidden'] = false
                    //         currentTreeData['hidden'] = false
                    //       }
                    //     }
                    //   }
                    // }

                    // 为解决上述问题
                    // 尝试可否把已勾选的留下（二级及其以下的内容保留），没有勾选的对象删除（二级及其以下的内容删除）
                    // 先遍历一遍将所有二级路由的名称与已经勾选的做对比，得到所有没有被勾选的二级路由名称
                    // 在遍历一遍将所有二级路由不存在的二级对象及其下属内容删除掉，得到所有被勾选的路由菜单和空的一级菜单
                    // 再整体遍历，如果一级对象下二级对象不存在，也删除一级对象
                    // 得到所有勾选的二级路由菜单的名称集合
                    var secondRouteList = []
                    for (var g = 0; g < this.tableData.length; g++) {
                      if (this.tableData[g].checked) {
                        secondRouteList.push(this.tableData[g].name)
                      }
                    }
                    // 得到所有没有被勾选的二级路由菜单名称集合
                    var NoSecondRouteList = []
                    for (var i = 0; i < treeList.length; i++) {
                      var currentTreeData = treeList[i]
                      var currentTreeItem = treeList[i].children
                      for (var j = 0; j < currentTreeItem.length; j++) {
                        var treePerItem = currentTreeItem[j]
                        var currentPerName = currentTreeItem[j].name
                        if (secondRouteList.indexOf(currentPerName) == -1) {
                          // currentTreeItem.splice(j,1)
                          NoSecondRouteList.push(currentPerName)
                        }
                      }
                    }
                    // 循环遍历将没有勾选的二级路由及其子路由删除
                    for (var i = 0; i < treeList.length; i++) {
                      var currentTreeData = treeList[i]
                      var currentTreeItem = treeList[i].children
                      for (var j = 0; j < currentTreeItem.length; j++) {
                        var treePerItem = currentTreeItem[j]
                        var currentPerName = currentTreeItem[j].name
                        if (currentPerName != '账号信息' && currentPerName != '修改密码') {
                          if (NoSecondRouteList.indexOf(currentPerName) != -1) {
                            // 从新数组里面删除，否者会影响正在循环的数组编号
                            treeListCopy[i].children.forEach((value, index, array) => {
                              if (value.name == currentPerName) {
                                // 1.要用delete删除，如果用splice删除会导致索引不准，删除数据出现偏差
                                // 但是delete删除会保留位置
                                // delete treeListCopy[i].children[index]
                                // 2.splice删除之后要长度减一
                                treeListCopy[i].children.splice(index, 1)
                                index = index - 1
                              }
                            })
                          }
                        }
                      }
                    }
                    // 最后遍历删除过二级菜单的数组，如果一级菜单下没有任何二级菜单，将一级菜单也删除
                    for (var i = 0; i < treeListCopy.length; i++) {
                      var copyTreeItem = treeListCopy[i].children
                      // 如果前面用delete删除
                      // for(var j = 0 ;j<copyTreeItem.length;j++){
                      //   if(copyTreeItem[j] == "" || copyTreeItem[j] == null){
                      //     copyTreeItem.splice(j,1);
                      //     j= j-1;
                      //   }
                      // }
                      if (!copyTreeItem.length) {
                        // delete treeListCopy[i]
                        treeListCopy.splice(i, 1)
                        i = i - 1
                      }
                    }
                    // console.log(treeListCopy,treeList,NoSecondRouteList)
                    // // console.log('66', treeList)
                    window.localStorage.setItem('userInfo', JSON.stringify(res))
                    window.localStorage.setItem('refreshToken', res.user.refreshToken)
                    window.localStorage.setItem('accessToken', res.user.accessToken)
                    // 本地登录数据api
                    window.localStorage.setItem('testRouter', JSON.stringify(treeListCopy))
                    // 除了默认存在的路由所占长度外如账号信息，还要有额外路由才能进入系统，大于的长度动态调节
                    if (treeListCopy && treeListCopy.length > 1) {
                      this.$message({
                        message: '登录成功',
                        type: 'success'
                      })
                      this.$router.push({ path: '/index' })
                    } else {
                      this.$message({
                        message: '登录失败',
                        type: 'warning'
                      })
                      this.$router.push({ path: '/' })
                    }
                  })
                } else {
                  this.$message({
                    type: 'warning',
                    message: '请求权限数据失败'
                  })
                }
              })

              // window.localStorage.setItem('userInfo', JSON.stringify(res))
              // window.localStorage.setItem('refreshToken', res.user.refreshToken)
              // window.localStorage.setItem('accessToken', res.user.accessToken)
              // // // 本地登录数据api
              // var abb = api3.treelist
              // window.localStorage.setItem('testRouter', JSON.stringify(abb))
              // if (abb && abb.length > 0) {
              //   this.$message({
              //     message: '登录成功',
              //     type: 'success'
              //   })
              //   this.$router.push({ path: '/index' })
              // } else {
              //   this.$message({
              //     message: '登录失败',
              //     type: 'warning'
              //   })
              //   this.$router.push({ path: '/' })
              // }
            }
          })

          // // window.localStorage.setItem('userInfo', JSON.stringify(res))
          // // window.localStorage.setItem('refreshToken', res.user.refreshToken)
          // // window.localStorage.setItem('accessToken', res.user.accessToken)
          // // 本地登录数据api
          // var abb = api3.treelist
          // window.localStorage.setItem('testRouter', JSON.stringify(abb))
          // console.log(abb)
          // if (abb && abb.length > 0) {
          //   this.$router.push({ path: '/index' })
          // } else {
          //   this.$router.push({ path: '/' })
          // }

          this.loading = false
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login {
  width     : 100%;
  height    : 100%;
  // margin: 60px 0px;
  // background: #fff center top no-repeat;
  // background-image: url('http://i4.fuimg.com/598922/81b4f39dc84f7e4b.jpg?ynotemdtimestamp=1531126286789');
  background-size: cover;
  // background: #fff center top no-repeat;
  // background-image: url('http://i4.fuimg.com/598922/81b4f39dc84f7e4b.jpg?ynotemdtimestamp=1531126286789');
  // background-size: cover;
}
.login-bg {
  // margin    : 0 auto;
  // background: rgba(50, 65, 78, 0.8) !important;
  height    : 400px;
  position  : absolute;
  top       : 50%;
  margin-top: -200px;
  // width     : 100%;
  left: 20%;
  // background: rgba(255,255,255,0.6);
  width: 100%;
  // margin-left: -250px;
  // border-radius:10px;
}
.login-container{
  width:420px;
  margin:0 auto;
  background: rgba(255,255,255,0.6);
  // padding:30px;
  border-radius:20px;
  height: 100%;
}
.login-header {
  position  : static;
  text-align: center;
  padding   : 0;
  left      : auto;
  margin    : 0;
  // padding    : 35px 0;
  padding    : 24px 0;
  top        : -80px;
  font-weight: 300;
  right      : 0;
  padding-top:50px;
}
.login-content {
  // background: rgba(255,255,255,0.6);
  color  : #999;
  width  : 400px;
  margin : 0 auto;
  padding: 0px 40px;
  .checkbox {
    text-align: left;
  }
  .m-b-20{
    margin-bottom: 20px!important;
}
// #loginName{
//     height: 60px;
// }
//  .el-input__inner{
//     border: none;
//     // border-color: rgba(241,239,243,1);
//     border-radius: 30px;
//     // background:rgba(241,239,243,1)
//     height: 60px!important;
//     padding: 10px 16px;
//     // font-size: 18px;
//     line-height: 1.3333333;
//     width: 100%;
//     font-size: 16px;
//   }
  button{
      width: 100%
  }
  label{
    color: #242a30;
    min-height: 20px;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;
  }
  .checkbox input[type=checkbox], .checkbox-inline input[type=checkbox], .radio input[type=radio], .radio-inline input[type=radio] {
    position: absolute;
    margin-top: 4px\9;
    margin-left: -20px;
  }

input[type=checkbox], input[type=radio] {
    margin: 4px 0 0;
    margin-top: 1px\9;
    line-height: normal;
}
  #submitFinal{
    border-radius: 30px;
    padding: 12px 17px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">

.login-content {
.el-input__inner{
    border: none;
    // border-color: rgba(241,239,243,1);
    border-radius: 30px;
    // background:rgba(241,239,243,1)
    height: 50px;
    padding: 10px 16px;
    // font-size: 18px;
    line-height: 50px;
    width: 100%;
    font-size: 14px;
  }
}

</style>

