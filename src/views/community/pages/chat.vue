//聊天记录
<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div class="member" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;">
      <div class="search_bar">
        <div class="search_bar_left">
          <!-- <div class="block">
            <span class="demonstration">日期</span>
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </div> -->
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label>
              <span class="demonstration">日期:</span>
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                @change="chooseDate"
              />
            </el-form-item>
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
            @click="deleteChat"
          >删除</el-button>
        </div>
      </div>
      <div class="housing_table">
        <el-table
          v-loading="listLoading"
          class="table_border"
          :data="tableData"
          border
          highlight-current-row
          :style="tableStyle"
          :header-cell-style="headerCellStyle"
          max-height="600"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            align="center"
          />
          <el-table-column
            prop="userName"
            align="center"
            label="用户名"
            width="220"
          />
          <el-table-column
            prop="fullName"
            align="center"
            label="姓名"
            width="200"
          />
          <el-table-column
            prop="identity"
            align="center"
            label="社区身份"
            width="180"
          />
          <el-table-column
            prop="msgTime"
            align="center"
            label="时间"
            width="200"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.msgTime">{{ $moment(scope.row.msgTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</p>
              <p v-else>{{ scope.row.msgTime }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            align="center"
            label="内容"
            width="180"
          />
          <el-table-column
            prop="name"
            align="center"
            label="操作"
          />
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
import { chatlogList, chatlogRemove } from '@/api/community'
import { offset } from '@/utils/offset'

export default {
  data() {
    return {
      offset: 8,
      searchForm: {
        goodsName: ''
      },
      listLoading: false,
      input: '',
      select: 'UserName',
      // 分页
      currentPage: 1,
      total: 200,
      tableData: [],
      tableStyle: 'width:100%;',
      org_name: '',
      show_list_line: true,
      multipleSelection: [],
      DisableSendMsg: '取消禁言',
      showButton: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value2: '',
      data: null
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.offset = offset()
  },
  methods: {
    // 日期过滤
    chooseDate() {
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
              'filterType': '4',
              'filterLogic': 0,
              'key': 'CreatedUTC',
              'value': this.value2
            },
            {
              'filterType': 3,
              'filterLogic': 0,
              'key': 'CreatedUTC',
              'value': this.$moment(this.value2).add(1, 'days')
            }
          ]
        }
      }
      this.AxiosIfo()
    },
    // 点击cheackbox
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection[0].id)
    },
    // 获取聊天记录
    fetchData() {
      this.listLoading = true
      const community_Id = this.$route.query.id
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
              'value': community_Id
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
      } else {
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
      if (this.input == '' || this.value2 == '') {
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
      }
      if (this.input !== '') {
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
      if (this.value2 !== '') {
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
              },
              {
                'filterType': '4',
                'filterLogic': 0,
                'key': 'CreatedUTC',
                'value': this.value2
              },
              {
                'filterType': 3,
                'filterLogic': 0,
                'key': 'CreatedUTC',
                'value': this.$moment(this.value2).add(1, 'days')
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
    // 删除
    deleteChat() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        var data = {
          id: this.multipleSelection[this.multipleSelection.length - 1].id
        }
        this.$confirm('确定要将该条删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          chatlogRemove(data).then(res => {
          // console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
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
        this.$alert('请先选择一条数据，进行修改', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      }
    },
    // 获取信息
    AxiosIfo() {
      chatlogList(this.data).then(res => {
        const Data = JSON.parse(JSON.stringify(res.data))
        console.log(Data)
        Data.forEach((item, index) => {
          if (item.identity == 0) {
            item.identity = '成员'
          }
          if (item.identity == 1) {
            item.identity = '助手'
          }
          if (item.identity == 2) {
            item.identity = '群主'
          }
        })
        this.listLoading = false
        this.tableData = Data
        this.total = res.pager.totalItems
      })
    }
  }
}
</script>

<style scoped  lang="scss">
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
.search_bar_right{
  margin-right:30px;
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
.search_bar_left{
  display: flex;
}
.demonstration{
  margin-left: 20px;
  margin-right: 10px;
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
