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
        <el-button v-if="resourcePermission['移除']" type="primary" style="float:right;" size="medium" @click="removeBlackList">移除黑名单</el-button>
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
        <el-table-column prop="blacklistReason" label="拉黑原因" width="280">
          <template slot-scope="scope">
            <p>{{ scope.row.userProfile.blacklistReason }}</p>
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
      <el-pagination
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { appUserSearch, appUserInfo, cancelputonblacklist } from '@/api/auth'
import permissionData from '@/utils/resPermission'
import { offset } from '@/utils/offset'

export default {
  data() {
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
      tableStyle: 'width:100%;',
      input3: '',
      select: '1',
      checked: true,
      multipleSelection: [],
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
            'value': true
          }
        ],
        'userName': '',
        'phoneNumber': ''
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
    this.resourcePermission = permissionData('用户列表黑名单')
    this.offset = offset()
  },
  methods: {
    searchData() {
      this.filterDatas.filters = [{
        'key': 'IsInBlacklist',
        'value': true
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
    removeBlackList() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$confirm('确定要移除黑名单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancelputonblacklist({ userId: this.multipleSelection[0].id }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '移除黑名单成功'
              })
              this.currentPage = 1
              this.filterDatas.currentPage = 1
              this.fetchData()
              // this.$router.push({ path: `/account/user_mng` })
            } else {
              this.$message.warning('移除黑名单失败')
              // console.log('88888',res.response.data.error)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移除'
          })
        })
      } else {
        this.$message({
          message: '请选择一条数据移除黑名单',
          type: 'warning'
        })
      }
    },
    detail(id) {
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

