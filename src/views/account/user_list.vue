// 商品管理
<template>
  <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;">
    <div class="search_bar">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <!-- <el-form-item label class="searchFormItem">
          <el-input v-model="input3" placeholder="请输入：用户名/手机号" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-form-item> -->
        <el-form-item label>
          <el-input v-model="searchForm.order_no" class="searchInput_300" placeholder="请输入用户名/手机号" clearable>
            <el-select slot="prepend" v-model="searchForm.type" placeholder="请选择" class="input-with-select" style="width:130px">
              <el-option label="用户名" value="1" />
              <el-option label="手机号" value="2" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click.prevent="searchData" />
          </el-input>
          <!-- <el-input
            v-model="searchForm.order_no"
            class="searchInput_300"
            placeholder="请输入订单编码/购买用户"
            clearable
            size="small"
          /> -->
        </el-form-item>
        <el-button v-if="resourcePermission['黑名单']" type="primary" style="float:right;margin-left:10px;" size="medium" @click="addBlackList">加入黑名单</el-button>
        <el-button v-if="resourcePermission['修改']" type="primary" style="float:right;" size="medium" @click="updateUser">修改</el-button>
        <el-button v-if="resourcePermission['新增']" type="primary" style="float:right;" size="medium" @click="addUser">用户注册</el-button>
        <el-button type="primary" style="float:right;" size="medium" @click="updatePwd">修改密码</el-button>
        <el-button v-if="resourcePermission['删除']" type="primary" class="el-icon-plus" style="float:right;display:none;" size="medium" @click="DeleteUser">删除用户</el-button>

      </el-form>
    </div>
    <div class="tableList" style="height:83%">
      <el-table
        v-loading="listLoading"
        class="table_border"
        :data="tableData"
        border
        highlight-current-row
        height="100%"
        :style="tableStyle"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="mini"
        max-height="600"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column type="index" :index="indexMethod" label="序号" width="60" /> -->
        <el-table-column prop="userName" label="用户名" width="150" />
        <el-table-column prop="firstName" label="姓名" width="150" sortable>
          <template slot-scope="scope">
            <!-- <p>{{ scope.row.userProfile.firstName+scope.row.userProfile.lastName }}</p> -->
            <p>{{ scope.row.userProfile.lastName+ scope.row.userProfile.firstName }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="80" sortable>
          <template slot-scope="scope">
            <p v-if="scope.row.userProfile.gender">女</p>
            <p v-else>男</p>
          </template>
        </el-table-column>
        <el-table-column prop="idCardNumber" label="身份证" width="200" sortable>
          <template slot-scope="scope">
            <p>{{ scope.row.userProfile.idCardNumber }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机" width="150" sortable />
        <el-table-column prop="location" label="所在地" width="260" sortable>
          <template slot-scope="scope">
            <p>{{ scope.row.userProfile.provinceName }}{{ scope.row.userProfile.cityName }}{{ scope.row.userProfile.districtName }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" sortable width="200">
          <template slot-scope="scope">
            <p>{{ scope.row.userProfile.address }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="createdUTC" label="注册时间" width="170">
          <template slot-scope="scope">
            <p v-if="scope.row.userProfile.createdUTC">{{ $moment(scope.row.userProfile.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm') }}</p>
            <p v-else>{{ scope.row.userProfile.createdUTC }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" min-width="120" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="detail(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div style="clear:both;" /> -->
    <div class="page_nation" style="margin-top:15px;">
      <!-- <el-pagination
        :current-page="currentPage"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /> -->
      <el-pagination
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="用户密码修改" :visible.sync="dialogFormVisible" width="600px">
      <el-form ref="form" label-width="120px" :model="form" :rules="rules">
        <el-form-item label="输入原密码" :label-width="formLabelWidth" prop="ylPassword">
          <el-input v-model="form.ylPassword" autocomplete="off" style="width:80%;" />
        </el-form-item>
        <el-form-item label="输入新密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off" style="width:80%;" />
        </el-form-item>
        <el-form-item label="重复新密码" :label-width="formLabelWidth" prop="repassword">
          <el-input v-model="form.repassword" autocomplete="off" style="width:80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="updatePwdSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="加入黑名单" :visible.sync="dialogFormVisible1" width="600px">
      <el-form ref="blackForm" label-width="120px" :model="blackForm" :rules="blackRules">
        <!-- <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off" style="width:80%;" disabled />
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="blackForm.name" autocomplete="off" style="width:80%;" disabled />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="blackForm.phone" autocomplete="off" style="width:80%;" disabled />
        </el-form-item> -->
        <el-form-item label="拉黑原因" :label-width="formLabelWidth" prop="blacklistReason">
          <el-input v-model.trim="blackForm.blacklistReason" autocomplete="off" style="width:80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="addBlackListSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除App用户" :visible.sync="dialogFormVisible2" width="600px">
      <el-form ref="form" label-width="120px" :model="form2">
        <el-form-item label="输入用户Id" :label-width="formLabelWidth">
          <el-input v-model="form2.name" autocomplete="off" style="width:80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="deleteUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { appUserSearch, appUserInfo, appUserUpdate, appUserDelete, putonblacklist } from '@/api/auth'
import { putPassword } from '@/api/login'
import permissionData from '@/utils/resPermission'
import { offset } from '@/utils/offset'

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空!'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      searchForm: {
        order_no: '',
        type: '1'
      },
      listLoading: false,
      // 分页
      currentPage: 1,
      total: 0,
      mockData: [],
      tableData: [],
      tableStyle: 'width:100%;overflow:hidden;',
      input3: '',
      select: '1',
      checked: true,
      multipleSelection: [],
      // 密码修改相关
      dialogFormVisible: false,
      form: {
        ylPassword: '',
        password: '',
        repassword: ''
      },
      rules: {
        ylPassword: [
          { required: true, message: '请输入原来的密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码为字母+数字，长度为 6 - 20位' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码为字母+数字，长度为 6 - 20位' }
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      // 加入黑名单相关
      dialogFormVisible1: false,
      blackForm: {
        userName: '',
        name: '',
        phone: '',
        isInBlacklist: '',
        blacklistReason: ''
      },
      blackRules: {
        blacklistReason: [
          { required: true, message: '请输入拉黑原因', trigger: 'blur' }
        ]
      },
      // 搜索
      filterDatas: {
        'numberPerPage': 10,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'CreatedUTC',
            'sortOrder': 1
          }
        ],
        'filters': [
          {
            'key': 'IsInBlacklist',
            'value': false
          }
        ],
        'userName': '',
        'phoneNumber': ''
      },
      // 删除App用户
      dialogFormVisible2: false,
      form2: {
        name: ''
      },
      // 权限相关
      resourcePermission: [],
      // 时间相关
      offset: 8
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.resourcePermission = permissionData('用户列表')
    this.offset = offset()
  },
  methods: {
    // 删除用户
    // 删除Resources
    deleteUserSubmit() {
      appUserDelete({ id: this.form2.name }).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '删除App用户成功!'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '删除App用户失败!'
          })
        }
        this.dialogFormVisible2 = false
      })
    },
    DeleteUser() {
      this.dialogFormVisible2 = true
    },
    searchData() {
      this.filterDatas.filters = [{
        'key': 'IsInBlacklist',
        'value': false
      }]
      this.filterDatas.userName = ''
      this.filterDatas.phoneNumber = ''
      if (this.searchForm.type && this.searchForm.order_no) {
        if (this.searchForm.type == 1) {
          // var obj = {
          //   'key': 'UserName',
          //   'value': this.searchForm.order_no,
          //   'filterType': 5
          // }
          // this.filterDatas.filters.push(obj)
          this.filterDatas.userName = this.searchForm.order_no
        } else if (this.searchForm.type == 2) {
          // var obj = {
          //   'key': 'PhoneNumber',
          //   'value': this.searchForm.order_no,
          //   'filterType': 5
          // }
          // this.filterDatas.filters.push(obj)
          this.filterDatas.phoneNumber = this.searchForm.order_no
        }
      }
      this.currentPage = 1
      this.filterDatas.currentPage = 1
      this.fetchData()
    },
    updatePwdSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          var obj = {
            'id': this.multipleSelection[0].id,
            'currentPassword': this.form.ylPassword,
            'newPassword': this.form.password
          }
          putPassword(obj).then(res => {
            if (res) {
              this.$message({
                message: '密码修改成功',
                type: 'success'
              })
              this.dialogFormVisible = false
            } else {
              this.$message({
                message: '密码修改失败',
                type: 'warning'
              })
              this.dialogFormVisible = false
            }
          }).catch(error => {
            // console.log('888',error.message,error.response)
            this.dialogFormVisible = false
          })
        } else {
          this.$message({
            message: '请正确填写表单',
            type: 'warning'
          })
          return false
        }
      })
    },
    addBlackListSubmit() {
      this.$refs.blackForm.validate((valid) => {
        if (valid) {
          console.log(this.blackForm.isInBlacklist)
          putonblacklist({ userId: this.multipleSelection[0].id, blacklistReason: this.blackForm.blacklistReason }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '加入黑名单成功'
              })
              this.dialogFormVisible1 = false
              this.currentPage = 1
              this.filterDatas.currentPage = 1
              this.fetchData()
              // this.$router.push({ path: `/account/user_mng` })
            } else {
              this.$message.warning('加入黑名单失败')
              // console.log('88888',res.response.data.error)
            }
          })
        } else {
          this.$message.warning('请正确填写表单')
          return false
        }
      })
    },
    updatePwd() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.dialogFormVisible = true
        this.$nextTick(function() {
          this.$refs['form'].resetFields()
        })
      } else {
        this.$message({
          message: '请选择一条数据进行密码修改',
          type: 'warning'
        })
      }
    },
    addUser() {
      this.$router.push('/account/user_mng/create')
    },
    updateUser() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$router.push({ path: '/account/user_mng/update', query: { id: this.multipleSelection[0].id }})
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    addBlackList() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        // this.$confirm('确定要添加到黑名单吗?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '添加成功!'
        //   })
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消添加'
        //   })
        // })
        this.dialogFormVisible1 = true
        this.blackForm.blacklistReason = ''
      } else {
        this.$message({
          message: '请选择一条数据加入黑名单',
          type: 'warning'
        })
      }
    },
    detail(id) {
      // this.$router.push({ path: `/order_mng/daily_care/order_detail`, query: { orderNumber: orderNumber }})
      this.$router.push({ path: '/account/user_mng/detail', query: { id: id }})
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fetchData() {
      this.listLoading = true
      appUserSearch(this.filterDatas).then(res => {
        if (res) {
          this.tableData = res.data
          this.total = res.pager.totalItems
        } else {
          this.$message({
            message: '获取数据失败！',
            type: 'warning'
          })
        }
      })
      this.listLoading = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.filterDatas.currentPage = val
      this.fetchData()

      // $('.el-pagination__total').html(`当前显示&nbsp;${(this.currentPage - 1) * 10 + 1}&nbsp;到&nbsp;${this.currentPage * 10}&nbsp;条，共&nbsp;${this.total}&nbsp;条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`)
    },
    // 表格连续排序
    indexMethod(index) {
      return (this.currentPage - 1) * 10 + index + 1
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center;'
      } else {
        return ''
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center;'
    }
  }
}
</script>
<style scoped  lang="scss">
.el-icon-search {
  font-size: 20px;
}
.rela{
  position: relative;
}
.el-dropdown-menu{
  top: 220px!important;
}
// .searchInput{
//   width: 80%;
// }
.searchFormItem{
  width: 300px;
  .el-form-item__content{
    width: 100%
  }
}
.table_border{
  border: 1px solid #ddd;
}
</style>
<style lang='scss'>
.searchFormItem{
  .el-form-item__content{
    width: 100%!important
  }
}
#userMng .el-input-group__prepend {
    width: 100px;
}
</style>

