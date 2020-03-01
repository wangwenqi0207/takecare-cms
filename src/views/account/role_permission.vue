// 商品管理
<template>
  <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;">
    <div class="search_bar">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label class="searchFormItem">
          <el-input v-model="searchForm.name" placeholder="请输入：角色名" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchData" />
          </el-input>
        </el-form-item>
        <el-button v-if="resourcePermission['删除']" type="primary" class="el-icon-delete" style="float:right;margin-left:10px;" size="medium" @click="deleteEmployee">删除</el-button>
        <el-button v-if="resourcePermission['修改']" type="primary" class="el-icon-edit-outline" style="float:right;" size="medium" @click="updateEmployee">修改</el-button>
        <el-button v-if="resourcePermission['新增']" type="primary" class="el-icon-plus" style="float:right;" size="medium" @click="addEmployee">新增</el-button>
        <!-- <el-button type="primary" class="el-icon-delete" style="float:right;margin-left:10px;" size="medium" @click="deleteEmployee">删除</el-button>
        <el-button type="primary" class="el-icon-edit-outline" style="float:right;" size="medium" @click="updateEmployee">修改</el-button>
        <el-button type="primary" class="el-icon-plus" style="float:right;" size="medium" @click="addEmployee">新增</el-button> -->
        <!-- <el-button type="primary" class="el-icon-plus" size="medium" @click="AddResources">新增Resources</el-button> -->
        <!-- <el-button type="primary" class="el-icon-plus" style="float:right;" size="medium" @click="DeleteResources">删除Resources</el-button> -->
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
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="createdUTC" label="创建时间">
          <template slot-scope="scope">
            <p v-if="scope.row.createdUTC">{{ $moment(scope.row.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm') }}</p>
            <p v-else>{{ scope.row.createdUTC }}</p>
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
      />
    </div>
    <!-- 新增及删除Resources -->
    <el-dialog title="创建Resources" :visible.sync="dialogFormVisible" width="600px">
      <el-form ref="form" label-width="120px" :model="form">
        <el-form-item label="输入模块名称" :label-width="formLabelWidth" prop="ylPassword">
          <el-input v-model="form.name" autocomplete="off" style="width:80%;" />
        </el-form-item>
        <el-form-item label="输入操作名称&隔开" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.name1" autocomplete="off" style="width:80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="createResSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除Resources" :visible.sync="dialogFormVisible1" width="600px">
      <el-form ref="form" label-width="120px" :model="form1">
        <el-form-item label="输入Resources的Id" :label-width="formLabelWidth" prop="ylPassword">
          <el-input v-model="form1.name" autocomplete="off" style="width:80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="deleteResSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rolesAdd, rolesInfo, rolesUpdate, rolesDelete, resourcesDelete, resourcesCreate, rolesSearch } from '@/api/auth'
import permissionData from '@/utils/resPermission'
import { offset } from '@/utils/offset'
export default {
  data() {
    return {
      searchForm: {
        name: ''
      },
      listLoading: false,
      // 分页
      currentPage: 1,
      total: 0,
      tableData: [],
      tableStyle: 'width:100%;',
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
        'filters': []
      },
      // 新增及删除Resources
      dialogFormVisible: false,
      form: {
        name: '',
        name1: ''
      },
      dialogFormVisible1: false,
      form1: {
        name: ''
      },
      formLabelWidth: '160px',
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
    this.resourcePermission = permissionData('角色权限设置')
    this.offset = offset()
  },
  methods: {
    // 新增Resources
    createResSubmit() {
      var perData = this.form.name1.split('&')
      var dataObj = {
        'resourcePermission': perData.map(item => {
          return {
            'name': item,
            'normalizedName': item,
            'id': null
          }
        }),
        'name': this.form.name,
        'normalizedName': this.form.name,
        'id': null
      }
      resourcesCreate(dataObj).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '创建Resources成功!'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '创建Resources失败!'
          })
        }
        this.dialogFormVisible = false
      })
    },
    AddResources() {
      this.dialogFormVisible = true
    },
    // 删除Resources
    deleteResSubmit() {
      resourcesDelete({ id: this.form1.name }).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '删除Resources成功!'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '删除Resources失败!'
          })
        }
        this.dialogFormVisible1 = false
      })
    },
    DeleteResources() {
      this.dialogFormVisible1 = true
    },
    searchData() {
      this.filterData.filters = []
      if (this.searchForm.name) {
        var obj = {
          'key': 'Name',
          'value': this.searchForm.name,
          'filterType': 5
        }
        this.filterData.filters.push(obj)
      }
      this.currentPage = 1
      this.filterData.currentPage = 1
      this.fetchData()
    },
    addEmployee() {
      this.$router.push('/account/staff_mng/role_permission')
    },
    updateEmployee() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$router.push({ path: '/account/staff_mng/role_permission_update', query: { id: this.multipleSelection[0].id }})
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
          rolesDelete({ id: this.multipleSelection[0].id }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.currentPage = 1
              this.filterData.currentPage = 1
              this.fetchData()
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
    detail(row) {
      console.log(row)
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fetchData() {
      this.listLoading = true
      rolesSearch(this.filterData).then(res => {
        if (res) {
          this.tableData = res.data
          this.total = res.pager.totalItems
        } else {
          this.$message.warning('获取角色数据失败')
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

