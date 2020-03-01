<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;">
      <div class="search_bar">
        <div class="search_bar_left">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label class="searchFormItem">
              <el-input v-model="input" placeholder="请输入内容" class="input-with-select" clearable>
                <el-select slot="prepend" v-model="select" placeholder="请输入内容" style="width:100px;">
                  <el-option label="用户名" value="UserName" />
                  <el-option label="姓名" value="FullName" />
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="getFilter" />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="search_bar_right">
          <el-button
            type="primary"
            size="medium"
            @click="cancel_Blacklist"
          >取消黑名单</el-button>
        </div>
      </div>
      <div class="tableList" style="height:83%">
        <el-table
          v-loading="listLoading"
          :data="tableData"
          highlight-current-row
          :style="tableStyle"
          :header-cell-style="headerCellStyle"
          class="table_border"
          border
          style="width: 100%;height:100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          />
          <el-table-column
            prop="userName"
            label="用户名"
            align="center"
            width="180"
          />
          <el-table-column
            prop="fullName"
            label="姓名"
            align="center"
            width="180"
          />
          <el-table-column
            prop="gender"
            align="center"
            width="180"
            label="性别"
          />
          <el-table-column
            prop="identity"
            label="社区身份"
            align="center"
            width="180"
          />
          <el-table-column
            prop="status"
            align="center"
            label="社区状态"
          />
        </el-table>
      </div>
      <div class="page_nation" style="margin-top:26px;">
        <el-pagination
          :current-page="currentPage"
          :page-size="100"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { memberSearch, cancelBlacklist, searchBlacklist } from '@/api/community'
export default {
  data() {
    return {
      searchForm: {
        goodsName: ''
      },
      listLoading: false,
      // 分页
      currentPage: 1,
      total: 200,
      tableData: [],
      tableStyle: 'width:100%;',
      select: 'UserName',
      input: '',
      flag: false,
      show_list_line: true,
      multipleSelection: [],
      data: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取黑名单
    fetchData() {
      this.data = {
        'data': {
          'numberPerPage': 10,
          'currentPage': this.currentPage,
          'filters': [
            {
              'key': 'Status',
              'value': '2'
            }
          ]
        }
      }
      this.AxiosIfo()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      if (this.input == '') {
        this.data = {
          'data': {
            'numberPerPage': 10,
            'currentPage': this.currentPage,
            'filters': [
              {
                'key': 'Status',
                'value': '2'
              }
            ]
          }
        }
      } else {
        this.data = {
          'data': {
            'numberPerPage': 10,
            'currentPage': this.currentPage,
            'filters': [
              {
                'key': this.select,
                'value': this.input
              },
              {
                'key': 'Status',
                'value': '2'
              }
            ]
          }
        }
      }
      this.AxiosIfo()
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd'
      } else {
        return ''
      }
    },
    // 搜索过滤
    getFilter() {
      this.currentPage = 1
      if (this.input == '') {
        this.data = {
          'data': {
            'numberPerPage': 10,
            'currentPage': this.currentPage,
            'filters': [
              {
                'key': 'Status',
                'value': '2'
              }
            ]
          }
        }
      } else {
        this.data = {
          'data': {
            'numberPerPage': 10,
            'currentPage': this.currentPage,
            'filters': [
              {
                'key': this.select,
                'value': this.input
              },
              {
                'key': 'Status',
                'value': '2'
              }
            ]
          }
        }
      }
      this.AxiosIfo()
    },
    // 取消黑名单
    cancel_Blacklist() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$confirm('确定要将该成员取消黑名单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            id: this.multipleSelection[this.multipleSelection.length - 1].id
          }
          cancelBlacklist(data).then(res => {
            // console.log(res)
            this.$message({
              type: 'success',
              message: '取消黑名单成功!'
            })
            this.fetchData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    // 请求
    AxiosIfo() {
      searchBlacklist(this.data).then(res => {
        console.log('黑名单', res)
        const Data = JSON.parse(JSON.stringify(res.data))
        Data.forEach((item, index) => {
        // 性别
          if (item.gender == 1) {
            item.gender = '男'
          }
          if (item.gender == 2) {
            item.gender = '女'
          }
          // 身份
          if (item.identity == 0) {
            item.identity = '成员'
          }
          if (item.identity == 1) {
            item.identity = '助手'
          }
          if (item.identity == 2) {
            item.identity = '群主'
          }
          // 状态
          switch (item.status) {
            case 0:
              item.status = '正常'
              break
            case 1:
              item.status = '禁言'
              break
            case 2:
              item.status = '黑名单'
              break
            default:
              return
          }
        })
        this.input = ''
        this.tableData = Data
        this.total = res.pager.totalItems
      })
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
.search_bar_right{
  margin-bottom:20px;
  margin-right: 20px;
}
.el-dropdown-menu{
  top: 190px !important;
}
.search_bar{
  display: flex;
  justify-content: space-between;
}
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
</style>
