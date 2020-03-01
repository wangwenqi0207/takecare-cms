// 员工账号
<template>
  <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;">
    <div class="search_bar">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label>
          <!-- <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ all_department }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" align="center">
              <el-dropdown-item
                v-for="item in allDepartmentList"
                :key="item.value"
                :command="{value:item.value,label:item.label,flag:1}"
              > {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-select
            v-model="searchForm.departmentId"
            v-el-select-loadmore="loadmore"
            placeholder="请选择所属部门"
            filterable
            :loading="false"
            loading-text="加载中......"
            size="small"
            clearable
          >
            <!-- multiple
              v-el-select-loadmore="loadmore" -->
            <el-option
              v-for="(item,index) in allDepartmentList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label style="display:none;">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ all_employeeType }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" align="center">
              <el-dropdown-item
                v-for="item in all_employeeType_list"
                :key="item.value"
                :command="{value:item.value,label:item.label,flag:2}"
              > {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>

        <el-form-item label>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ all_status }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" align="center">
              <el-dropdown-item
                v-for="item in all_status_list"
                :key="item.value"
                :command="{value:item.value,label:item.label,flag:3}"
              > {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item label class="searchFormItem">
          <el-input v-model="searchForm.order_no" placeholder="请输入内容" class="input-with-select" style="width:360px" clearable>
            <el-select slot="prepend" v-model="searchForm.type" placeholder="请选择">
              <el-option label="用户名" value="1" />
              <el-option label="姓名" value="2" />
              <el-option label="手机号" value="3" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchData" />
          </el-input>
        </el-form-item>
        <el-button v-if="resourcePermission['删除']" type="primary" style="float:right;margin-left:10px;" size="medium" class="el-icon-delete" @click="deleteEmployee">删除</el-button>
        <el-button v-if="resourcePermission['修改']" type="primary" class="el-icon-edit-outline" style="float:right;" size="medium" @click="updateEmployee">修改</el-button>
        <el-button v-if="resourcePermission['新增']" type="primary" class="el-icon-plus" style="float:right;" size="medium" @click="addEmployee">新增</el-button>
        <!-- <el-button type="primary" style="float:right;margin-left:10px;" size="medium" class="el-icon-delete" @click="deleteEmployee">删除</el-button>
        <el-button type="primary" class="el-icon-edit-outline" style="float:right;" size="medium" @click="updateEmployee">修改</el-button>
        <el-button type="primary" class="el-icon-plus" style="float:right;" size="medium" @click="addEmployee">新增</el-button> -->
      </el-form>
    </div>
    <div class="tableList" style="height:83.5%">
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="userName" label="用户名" width="180" />
        <el-table-column prop="type" label="员工类型" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.userProfile.type==0">普通员工</p>
            <p v-else-if="scope.row.userProfile.type==1">代理</p>
            <p v-else>{{ scope.row.userProfile.type }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
          <template slot-scope="scope">
            <!-- <p>{{ scope.row.userProfile.firstName+scope.row.userProfile.lastName }}</p> -->
            <p>{{ scope.row.userProfile.lastName+ scope.row.userProfile.firstName }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="position" label="职位" width="150">
          <template slot-scope="scope">
            <p>{{ scope.row.userProfile.position }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="所属部门" width="150" />
        <!-- 数组 -->
        <el-table-column prop="roles" label="角色" width="150">
          <template slot-scope="scope">
            <p v-for="(item,i) in scope.row.roles" :key="i" :v-if="Array.isArray(scope.row.roles)">&nbsp;{{ item.roleName }}&nbsp;</p>
          </template>
        </el-table-column>
        <!-- 数组 -->
        <el-table-column prop="cityCodes" label="负责城市" width="130">
          <template slot-scope="scope">
            <p v-for="(item,i) in scope.row.userProfile.cities" :key="i">&nbsp;{{ item.cityName }}&nbsp;</p>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="120" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="status" label="状态" width="60">
          <template slot-scope="scope">
            <p v-if="scope.row.userProfile.status==0">有效</p>
            <p v-else-if="scope.row.userProfile.status==1">无效</p>
            <p v-else>{{ scope.row.userProfile.status }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" min-width="120" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="detail(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page_nation" style="margin-top:20px;">
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
      >
        <!-- <span class="el-pagination__total">当前显示 {{ totalStart }} 到 {{ totalEnd }} 条,&nbsp;共 {{ total }} 条记录&nbsp;&nbsp;</span> -->
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { employeeSearch, employeeDelete } from '@/api/auth'
import { searchDepartment } from '@/api/department'
import permissionData from '@/utils/resPermission'

export default {
  directives: {
    'el-select-loadmore': {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          /**
                    * scrollHeight 获取元素内容高度(只读)
                    * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                    * clientHeight 读取元素的可见高度(只读)
                    * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                    * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                    */
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
          if (condition) {
            binding.value()
          }
        })
      }
    }
  },
  data() {
    return {
      searchForm: {
        order_no: '',
        type: '1',
        departmentId: ''
      },
      DepListCrrentPage: 1,
      listLoading: false,
      // 分页
      currentPage: 1,
      total: 0,
      totalStart: 1,
      totalEnd: 10,
      tableData: [],
      tableStyle: 'width:100%;',
      input3: '',
      select: '1',
      checked: true,
      multipleSelection: [],
      filterData: {
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
            'key': 'Type',
            'value': 0
          }
        ],
        'departmentId': '',
        'userName': '',
        'phoneNumber': ''
      },
      all_departmentValue: '',
      all_department: '全部部门',
      allDepartmentList: [],
      all_employeeTypeValue: '',
      all_employeeType: '员工类型',
      all_employeeType_list: [{
        value: '',
        label: '员工类型'
      }, {
        value: '0',
        label: '普通员工'
      }, {
        value: '1',
        label: '代理人'
      }],
      all_statusValue: '',
      all_status: '全部状态',
      all_status_list: [{
        value: '',
        label: '全部状态'
      }, {
        value: '0',
        label: '有效'
      }, {
        value: '1',
        label: '无效'
      }],
      // 权限相关
      resourcePermission: []
    }
  },
  watch: {
    // currentPage(val) {
    //   // console.log(this.total)
    //   this.totalStart = (val - 1) * 10 + 1
    //   this.totalEnd = val * 10
    // }
  },
  created() {
    this.fetchData()
    this.getDepartment()
  },
  mounted() {
    this.resourcePermission = permissionData('员工账号')
  },
  methods: {
    loadmore() {
      // console.log('loadmore!')
      this.DepListCrrentPage++
      // console.log('currentPage=' + this.policyInfo.currentPage)
      this.getDepartment()
    },
    getDepartment() {
      searchDepartment({ 'numberPerPage': 10, 'currentPage': this.DepListCrrentPage, 'sortList': [{ 'columnName': 'Id', 'sortOrder': 1 }] }).then(res => {
        if (res) {
          var dataList = res.data.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          this.$nextTick(function() {
            this.allDepartmentList = this.allDepartmentList.concat(dataList)
          })
        } else {
          this.$message.warning('获取部门数据失败')
        }
      })
    },
    searchData() {
      this.filterData.filters = [
        {
          'key': 'Type',
          'value': 0
        }
      ]
      this.filterData.departmentId = ''
      this.filterData.userName = ''
      this.filterData.phoneNumber = ''
      if (this.searchForm.type && this.searchForm.order_no) {
        if (this.searchForm.type == 1) {
          this.filterData.userName = this.searchForm.order_no
        } else if (this.searchForm.type == 2) {
          var obj = {
            'key': 'FullName',
            'value': this.searchForm.order_no,
            'filterType': 5
          }
          this.filterData.filters.push(obj)
        } else if (this.searchForm.type == 3) {
          this.filterData.phoneNumber = this.searchForm.order_no
        }
      }
      if (this.searchForm.departmentId) {
        this.filterData.departmentId = this.searchForm.departmentId
      }
      if (this.all_employeeTypeValue) {
        var obj1 = {
          'key': 'Type',
          'value': this.all_employeeTypeValue
        }
        this.filterData.filters.push(obj1)
      }
      if (this.all_statusValue) {
        var obj1 = {
          'key': 'Status',
          'value': this.all_statusValue
        }
        this.filterData.filters.push(obj1)
      }
      this.currentPage = 1
      this.filterData.currentPage = 1
      this.fetchData()
    },
    // select 点击
    handleCommand(command) {
      switch (command.flag) {
        case 1:
          this.all_department = command.label
          this.all_departmentValue = command.value
          break
        case 2:
          this.all_employeeType = command.label
          this.all_employeeTypeValue = command.value
          break
        case 3:
          this.all_status = command.label
          this.all_statusValue = command.value
          break
        default:
          return
      }
    },
    addEmployee() {
      this.$router.push({ path: '/account/staff_mng/add', query: { type: 0 }})
    },
    updateEmployee() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$router.push({ path: '/account/staff_mng/update', query: { id: this.multipleSelection[0].id, type: 0 }})
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    deleteEmployee() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$confirm('是否要删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          employeeDelete({ id: this.multipleSelection[0].id }).then(res => {
            if (res) {
              this.currentPage = 1
              this.filterData.currentPage = 1
              this.fetchData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '请选择一条数据进行删除',
          type: 'warning'
        })
      }
    },
    detail(id) {
      this.$router.push({ path: '/account/staff_mng/detail', query: { id: id, type: 0 }})
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fetchData() {
      this.listLoading = true
      employeeSearch(this.filterData).then(res => {
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
      // testList().then(response => {
      //   console.log('66666')
      //   // this.mockData = response.data.items
      //   // this.total = response.data.items.length
      //   // // $('.el-pagination__total').html(`当前显示&nbsp;1&nbsp;到&nbsp;10&nbsp;条，共&nbsp;${this.total}&nbsp;条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`)
      //   // this.tableData = response.data.items.slice(0, 10)
      //   // this.listLoading = false
      // })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.filterData.currentPage = val
      this.fetchData()

      // $('.el-pagination__total').html(`当前显示&nbsp;${(this.currentPage - 1) * 10 + 1}&nbsp;到&nbsp;${this.currentPage * 10}&nbsp;条，共&nbsp;${this.total}&nbsp;条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`)
    },
    // 表格连续排序
    indexMethod(index) {
      return (this.currentPage - 1) * 10 + index + 1
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd'
      } else {
        return ''
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;'
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
#staffMng .el-input-group__prepend {
    width: 100px;
}
</style>

