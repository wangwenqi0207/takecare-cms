//社区成员
<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div class="member" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;">
      <div class="search_bar">
        <div class="search_bar_left">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{ community_state }}<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown" align="center">
                  <el-dropdown-item
                    v-for="item in community_state_list"
                    :key="item.value"
                    :command="{value:item.value,label:item.label}"
                  > {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label class="searchFormItem">
              <el-input v-model="input" placeholder="请输入内容" class="input-with-select">
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
            icon="el-icon-plus"
            @click="shutup"
          >禁言</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="add_blacklist"
          >加入黑名单</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="delete_list"
          >移除成员</el-button>
        </div>
      </div>
      <div class="tableList" style="height:83%">
        <el-table
          v-loading="listLoading"
          class="table_border"
          :data="tableData"
          border
          highlight-current-row
          :style="tableStyle"
          :header-cell-style="headerCellStyle"
          size="mini"
          max-height="600"
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
            width="200"
            align="center"
          />
          <el-table-column
            prop="fullName"
            label="姓名"
            width="150"
            align="center"
          />
          <el-table-column
            prop="gender"
            label="性别"
            width="180"
            sortable
            align="center"
          />
          <el-table-column
            prop="identity"
            label="社区身份"
            width="200"
            sortable
            align="center"
          />
          <el-table-column
            prop="status"
            label="社区状态"
            width="150"
            sortable
            align="center"
          />
          <el-table-column
            prop="createdUTC"
            label="加入时间"
            width="180"
            sortable
            align="center"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.createdUTC">{{ $moment(scope.row.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</p>
              <p v-else>{{ scope.row.createdUTC }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="操作"
            min-width="80"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button v-if="scope.row.status=='正常'&& scope.row.identity=='成员'" type="primary" size="medium" @click="Shutup_this(scope.$index, scope.row)">禁言</el-button>
              <el-button v-else-if="scope.row.status=='黑名单' && scope.row.identity=='成员'" type="primary" size="medium" @click="cancel_Blacklist(scope.$index, scope.row)">取消黑名单</el-button>
              <el-button v-else-if="scope.row.status=='禁言' && scope.row.identity=='成员'" type="primary" size="medium" @click="cancel_Shutup(scope.$index, scope.row)">取消禁言</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page_nation" style="margin-top:26px;">
        <el-pagination
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { memberSearch, memberShutup, cancelShutup, addBlacklist, cancelBlacklist, deleteCommunitymember, searchBlacklist } from '@/api/community'
import { offset } from '@/utils/offset'

export default {
  data() {
    return {
      offset: 8,
      searchForm: {
        goodsName: ''
      },
      listLoading: false,
      select: 'UserName',
      input: '',
      buttons: '禁言',
      // 分页
      currentPage: 1,
      total: 200,
      tableData: [],
      copyTableData: [],
      tableStyle: 'width:100%;',
      show_list_line: true,
      multipleSelection: [],
      community_state: '全部社区状态',
      community_state_list: [{
        value: '3',
        label: '全部社区状态'
      }, {
        value: '0',
        label: '正常'
      }, {
        value: '1',
        label: '禁言'
      }, {
        value: '2',
        label: '黑名单'
      }],
      showButton: true,
      shutupTime: '',
      data: null,
      command_value: 3
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.offset = offset()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection[this.multipleSelection.length-1].identity)
    },
    // 禁言
    Shutup_this(index, row) {
      var data = {
        id: row.id
      }
      console.log(row.id)
      this.$confirm('确定要将该成员禁言吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var date = Number(new Date())
        console.log(date)
        memberShutup(data).then(res => {
        // console.log(res)
          this.$message({
            type: 'success',
            message: '禁言成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 禁言取消等操作
    cancel_Shutup(index, row) {
      var data = {
        id: row.id
      }
      console.log(row.id)
      this.$confirm('确定要将该成员取消禁言吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelShutup(data).then(res => {
        // console.log(res)
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 移除黑名单
    cancel_Blacklist(index, row) {
      var data = {
        id: row.id
      }
      console.log(row.id)
      this.$confirm('确定要将该成员取消黑名单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelBlacklist(data).then(res => {
        // console.log(res)
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 拉取成员列表
    fetchData() {
      console.log('社区id', this.$route.query.id)
      this.data = {
        'data': {
          'numberPerPage': 10,
          'currentPage': this.currentPage,
          'sortList': [
            {
              'columnName': 'CreatedUTC',
              'sortOrder': 1
            }
          ],
          'filters': [
            {
              'key': 'CommunityId',
              'value': this.$route.query.id
            }
          ]
        }
      }
      this.AxiosIfo()
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
                'key': 'CommunityId',
                'value': this.$route.query.id
              }
            ]
          }
        }
      }
      if (this.input !== '') {
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
                'key': 'CommunityId',
                'value': this.$route.query.id
              }
            ]
          }
        }
      }
      this.AxiosIfo()
    },
    // 分页
    handleCurrentChange(val) {
      // console.log(val)
      this.currentPage = val
      if (this.command_value == 3) {
        this.data = {
          'data': {
            'numberPerPage': 10,
            'currentPage': this.currentPage,
            'filters': [
              {
                'key': 'CommunityId',
                'value': this.$route.query.id
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
                'key': 'CommunityId',
                'value': this.$route.query.id
              },
              {
                'key': 'Status',
                'value': this.command_value
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
    // select 点击 切换状态
    handleCommand(command) {
      this.community_state = command.label
      this.command_value = command.value
      // console.log('command.value',command.value)
      if (command.value == 3) {
        this.data = {
          'data': {
            'numberPerPage': 10,
            'currentPage': this.currentPage,
            'filters': [
              {
                'key': 'CommunityId',
                'value': this.$route.query.id
              }
            ]
          }
        }
        this.AxiosIfo()
      }
      if (command.value == 2) {
        const data = {
          'data': {
            'numberPerPage': 10,
            'currentPage': this.currentPage,
            'filters': [
              {
                'key': 'CommunityId',
                'value': this.$route.query.id
              },
              {
                'key': 'Status',
                'value': command.value
              }
            ]
          }
        }
        searchBlacklist(data).then(res => {
          if (res.data.length == 0) {
            this.$message({
              message: '暂无数据',
              type: 'warning'
            })
          }
          const Data = JSON.parse(JSON.stringify(res.data))
          Data.forEach((item, index) => {
            // 性别
            if (item.gender == 0) {
              item.gender = '男'
            }
            if (item.gender == 1) {
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
          this.tableData = Data
          this.copyTableData = Data
          this.total = res.pager.totalItems
        })
      } if (command.value == 0 || command.value == 1) {
        this.data = {
          'data': {
            'numberPerPage': 10,
            'currentPage': this.currentPage,
            'filters': [
              {
                'key': 'CommunityId',
                'value': this.$route.query.id
              },
              {
                'key': 'Status',
                'value': command.value
              }
            ]
          }
        }
        this.AxiosIfo()
      }
    },
    // 禁言
    shutup() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        if (this.multipleSelection[this.multipleSelection.length - 1].identity == '助手' || this.multipleSelection[this.multipleSelection.length - 1].identity == '群主') {
          this.$message({
            message: '只有成员才能被禁言',
            type: 'warning'
          })
        } else {
          if (this.multipleSelection && this.multipleSelection.length === 1) {
            this.$confirm('确定要将该成员禁言吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var date = Number(new Date())
              // console.log(date)
              var data = {
                id: this.multipleSelection[this.multipleSelection.length - 1].id
              }
              memberShutup(data).then(res => {
                // console.log(res)
                this.$message({
                  type: 'success',
                  message: '禁言成功!'
                })
                this.fetchData()
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
        }
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    // 加入黑名单
    add_blacklist() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        console.log('身份', this.multipleSelection[this.multipleSelection.length - 1].identity)
        if (this.multipleSelection[this.multipleSelection.length - 1].identity == '助手' || this.multipleSelection[this.multipleSelection.length - 1].identity == '群主') {
          this.$message({
            message: '只有成员才能被加入黑名单',
            type: 'warning'
          })
        } else {
          if (this.multipleSelection && this.multipleSelection.length === 1) {
            this.$confirm('确定要将该成员加入黑名单吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var date = Number(new Date())
              // console.log(date)
              var data = {
                id: this.multipleSelection[this.multipleSelection.length - 1].id
              }
              addBlacklist(data).then(res => {
                console.log('加入黑名单', res)
                this.$message({
                  type: 'success',
                  message: '加入黑名单成功!'
                })
                this.fetchData()
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
        }
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    // 移除成员
    delete_list() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        if (this.multipleSelection[this.multipleSelection.length - 1].identity == '助手' || this.multipleSelection[this.multipleSelection.length - 1].identity == '群主') {
          this.$message({
            message: '只有成员才能被移除',
            type: 'warning'
          })
        } else {
          if (this.multipleSelection && this.multipleSelection.length === 1) {
            this.$confirm('确定要移除该成员吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var date = Number(new Date())
              // console.log(date)
              var data = {
                id: this.multipleSelection[this.multipleSelection.length - 1].id
              }
              deleteCommunitymember(data).then(res => {
                // console.log(res)
                this.$message({
                  type: 'success',
                  message: '移除成员成功!'
                })
                this.fetchData()
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '移除失败'
              })
            })
          }
        }
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    AxiosIfo() {
      memberSearch(this.data).then(res => {
        console.log('社区成员', res)
        if (res.data.length == 0) {
          this.$message({
            message: '暂无数据',
            type: 'warning'
          })
        }
        const Data = JSON.parse(JSON.stringify(res.data))
        Data.forEach((item, index) => {
        // 性别
          if (item.gender == 0) {
            item.gender = '男'
          }
          if (item.gender == 1) {
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
        this.tableData = Data
        this.copyTableData = Data
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
.el-dropdown-menu{
  top: 250px !important;
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
