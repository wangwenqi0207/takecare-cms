<template>
  <div id="userInfo" style="height:100%;">
    <div style="height: 100%;background: #fff;overflow:auto;min-width:1200px;">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" v-model="form" label-width="120px" disabled>
            <el-row id="zhqx1">
              <el-form-item label="账号信息" />
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="员工类型">
                  <el-radio v-if="type==1" v-model="form.accountType" :label="1">代理人</el-radio>
                  <el-radio v-if="type==0" v-model="form.accountType" :label="0">普通员工</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名">
                  <el-input v-model="form.username" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机">
                  <el-input v-model="form.phoneNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="部门">
                  <el-input v-model="form.departmentName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职位">
                  <el-input v-model="form.position" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="type==1">
              <el-col :span="6">
                <el-form-item label="级别" required>
                  <el-select v-model="form.level" placeholder="请选择">
                    <el-option value="1" label="选项一" />
                    <el-option value="1" label="选项二" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="上级" required>
                  <el-select v-model="form.superior" placeholder="请选择">
                    <el-option value="1" label="选项一" />
                    <el-option value="1" label="选项二" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="type==1">
              <el-col :span="6">
                <el-form-item label="代理人编号">
                  <el-input v-model="form.agentNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="type==1">
              <el-col :span="12">
                <el-form-item label="保险公司">
                  <el-select v-model="form.insuranceCompanyId" placeholder="请选择">
                    <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option> -->
                    <el-option value="1" label="选项一" />
                    <el-option value="1" label="选项二" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="type==1">
              <el-col :span="16">
                <el-form-item label="银行账号">
                  <el-row>
                    <el-col :span="2">
                      <span>开户行</span>
                    </el-col>
                    <el-col :span="8">
                      <el-select v-model="form.openingBankId" placeholder="请选择">
                        <!-- <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option> -->
                        <el-option value="1" label="选项一" />
                        <el-option value="1" label="选项二" />
                      </el-select>
                    </el-col>
                    <el-col :span="2">
                        &nbsp;
                    </el-col>
                    <el-col :span="3">
                      <span>银行卡号</span>
                    </el-col>
                    <el-col :span="8">
                      <el-input v-model="form.bankCardNumber" />
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="负责城市">
                  <el-select v-model="form.cityCodes" multiple placeholder="请选择">
                    <el-option
                      v-for="(item,index) in allCityList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="6">
                <el-form-item label="">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                &nbsp;
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-col :span="4">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="4">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="4">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="4">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="4">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="4">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="4">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="4">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                </el-row>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="部门负责人">
                  <el-radio v-model="form.isDepartmentAdmin" :label="true">是</el-radio>
                  <el-radio v-model="form.isDepartmentAdmin" :label="false">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="邮箱">
                  <el-input v-model="form.email" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="QQ">
                  <el-input v-model="form.qq" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="微信号">
                  <el-input v-model="form.weChat" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row id="zhqx">
              <el-form-item label="账号权限">
                <span style="margin:22px 0px;display:block;">只能查看本账号权限</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="账号权限">
                <el-col :span="16">
                  <!-- 用for循环 -->
                  <el-row>
                    <el-checkbox-group v-model="userRoleList">
                      <el-checkbox
                        v-for="(item,i) in RolesList"
                        :key="i"
                        :label="item.id+'&&'+item.name"
                      >
                        {{ item.name }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-row>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="数据权限">
                  <el-radio v-model="dataPermissions" :label="1">全部部门</el-radio>
                  <el-radio v-model="dataPermissions" :label="2">自己</el-radio>
                  <el-radio v-model="dataPermissions" :label="3">指定部门</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="权限明细" />
              </el-col>
            </el-row>
            <el-row id="myRolePre">
              <el-col :span="16" style="margin-left:3%;">
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    prop="date"
                    label="日期"
                    style="padding:0px"
                  >
                    <template slot-scope="scope">
                      <div style="display:inline-block;width:28%;float:left;padding:10px;">
                        <!-- <el-checkbox v-model="scope.row.checked" disabled>{{ scope.row.name }}</el-checkbox> -->
                        <p style="color:#C0C4CC;">{{ scope.row.name }}</p>
                      </div>
                      <div style="display:inline-block;width:70%;float:left;border-left:1px solid #EBEEF5;padding:10px">
                        <el-checkbox v-for="(item,i) in scope.row.resourcePermission" :key="i" v-model="item.checked" disabled>{{ item.name }}</el-checkbox>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <!-- <el-form-item>
                <el-button>取消</el-button>
                <el-button type="primary" @click="onSubmit">提交</el-button>
              </el-form-item> -->
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row style="margin:20px 100px;">
        <el-button type="primary" size="medium" @click="cancel">返回</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import { employeeInfo, rolesSearch, resourcesSearch } from '@/api/auth'
import { searchCity } from '@/api/city'

export default {
  data() {
    return {
      RolesList: [],
      dataPermissions: '',
      form: {
        accountType: '',
        username: '',
        phoneNumber: '',
        departmentName: '',
        position: '',
        level: '',
        superior: '',
        agentNumber: '',
        insuranceCompanyId: '',
        openingBankId: '',
        bankCardNumber: '',
        cityCodes: '',
        isDepartmentAdmin: '',
        email: '',
        qq: '',
        weChat: ''
      },
      value: '1',
      tableData: [],
      checkList: [],
      userRoleList: [],
      type: 0,
      allCityList: []
    }
  },
  created() {
  },
  mounted() {
    this.getEmployeeInfo()
    this.getCityData()
    this.getRolesList()
    this.getResourceData()
  },
  methods: {
    cancel() {
      this.$router.push({ path: `/index` })
    },
    getEmployeeInfo() {
      var data = JSON.parse(window.localStorage.getItem('userInfo'))
      if (data) {
        employeeInfo({ id: data.user.id }).then(res => {
          if (res) {
            this.form = {
              accountType: res.userProfile.type,
              username: res.userName,
              phoneNumber: res.phoneNumber,
              departmentName: res.departmentName,
              position: res.userProfile.position,
              level: res.userProfile.level,
              superior: res.userProfile.superior,
              agentNumber: res.userProfile.agentNumber,
              insuranceCompanyId: res.userProfile.insuranceCompanyId,
              openingBankId: res.userProfile.openingBankId,
              bankCardNumber: res.userProfile.bankCardNumber,
              cityCodes: res.userProfile.cityCodes,
              isDepartmentAdmin: res.isDepartmentAdmin,
              email: res.email,
              qq: res.userProfile.qq,
              weChat: res.userProfile.weChat
            }
            this.userRoleList = res.roles.map(item => {
              return item.roleId + '&&' + item.roleName
            })
            this.updateQXDetail(this.userRoleList)
          } else {
            this.$message({
              message: '数据信息请求失败',
              type: 'warning'
            })
          }
        })
      }
    },
    // 权限明细相关
    updateQXDetail(val) {
      // console.log('666',val)
      // 每次权限勾选有变化时，权限明细勾选都置为空
      // for循环置空，可考虑深拷贝
      for (var j = 0; j < this.tableData.length; j++) {
        var currentTableItem = this.tableData[j]
        for (var g = 0; g < currentTableItem.resourcePermission.length; g++) {
          var currentPerItem = currentTableItem.resourcePermission[g]
          currentPerItem.checked = false
        }
      }
      // 权限明细展示选中的回填
      // 根据选中的角色权限id获取其有的userClaims
      if (val.length) {
        var userClaims = []
        var newUserClaims = []
        // 查询所有角色权限明细
        var filters = val.map(item => {
          return {
            'filterLogic': 1,
            'key': 'Id',
            'value': item.split('&&')[0]
          }
        })
        rolesSearch({
          'numberPerPage': 100,
          'currentPage': 1,
          'sortList': [
            {
              'columnName': 'CreatedUTC',
              'sortOrder': 1
            }
          ],
          'filters': filters
        }).then(res => {
          if (res) {
            // this.RolesList = res.data
            for (var i = 0; i < res.data.length; i++) {
              var currentItem = res.data[i]
              for (var j = 0; j < currentItem.roleClaims.length; j++) {
                var currentRoleClaims = currentItem.roleClaims[j]
                userClaims.push({
                  'claimType': currentRoleClaims.claimType,
                  'claimValue': currentRoleClaims.claimValue
                })
              }
            }
            // 如果选了不同的角色，权限明细可能会有重复，去重
            $.each(userClaims, function(i, v) {
              var flag = true
              if (newUserClaims.length > 0) {
                $.each(newUserClaims, function(n, m) {
                  if (newUserClaims[n].claimType == userClaims[i].claimType && newUserClaims[n].claimValue == userClaims[i].claimValue) { flag = false }
                })
              }
              if (flag) {
                newUserClaims.push(userClaims[i])
              }
            })
            // console.log(userClaims,newUserClaims)
            // 获取到userClaims之后，进行与全部的比较回填操作
            // this.roleClaims = res.roleClaims
            this.$nextTick(() => {
              for (var i = 0; i < newUserClaims.length; i++) {
                var currentClaims = newUserClaims[i]
                for (var j = 0; j < this.tableData.length; j++) {
                  var currentTableItem = this.tableData[j]
                  if (currentTableItem.name == currentClaims.claimType) {
                    for (var g = 0; g < currentTableItem.resourcePermission.length; g++) {
                      var currentPerItem = currentTableItem.resourcePermission[g]
                      if (currentPerItem.name == currentClaims.claimValue) {
                        currentPerItem.checked = true
                        currentPerItem.id = currentClaims.id
                      }
                    }
                  }
                }
              }
            })
          } else {
            // this.$message.warning('获取角色数据失败')
          }
        })
      }
    },
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
    getResourceData() {
      resourcesSearch({
        'numberPerPage': 100,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 0
          }
        ]
      }).then(res => {
        if (res) {
          var treeList = res.data
          var data = this.forTree(treeList)
          // 深拷贝与浅拷贝问题，此处需要深拷贝
          //   console.log(data)
          this.tableData = data
        } else {
          this.$message({
            type: 'warning',
            message: '请求权限数据失败'
          })
        }
      })
    },
    getRolesList() {
      rolesSearch({
        'numberPerPage': 100,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'CreatedUTC',
            'sortOrder': 1
          }
        ]
      }).then(res => {
        if (res) {
          this.RolesList = res.data
        } else {
          this.$message.warning('获取角色数据失败')
        }
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    getCityData() {
      searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'filterLogic': 1, 'key': 'CityLevel', 'value': '1' }, { 'filterLogic': 1, 'key': 'CityLevel', 'value': '2' }] }).then(res => {
        if (res) {
          const map1 = res.data.map(item => {
            return {
              value: item.cityCode,
              label: item.name
            }
          })
          this.allCityList = map1
        //   this.serve_cityAll = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
span {
  font-size: 16px;
  color: #666666;
  font-weight: 400;
  font-style: normal;
}
</style>
<style lang="scss">
#userInfo .el-table__header-wrapper{
  display: none;
}
#userInfo .el-select{
  width: 100%;
}
#zhqx .el-form-item__label,#zhqx1 .el-form-item__label{
  margin: 20px 0px;
  font-size: 20px;
  color:rgb(62, 141, 255);
}
#zhqx .el-form-item,#zhqx1 .el-form-item{
  margin-bottom: 0px;
}
#userInfo #myRolePre{
  .el-table td, .el-table th{
    padding:0px;
  }
}
</style>

