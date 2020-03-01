<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;">
      <div class="search_bar">
        <div class="search_bar_left">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">

            <el-form-item label>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{ all_city }}<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown" align="center">
                  <el-dropdown-item
                    v-for="item in all_city_list"
                    :key="item.value"
                    :command="{value:item.value,label:item.label,flag:1}"
                  > {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>

            <el-form-item label>
              <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
                <span class="el-dropdown-link">
                  {{ all_type_org }}<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu
                  slot="dropdown"
                  align="center"
                  class="org_select_menu_two"
                >
                  <el-dropdown-item
                    v-for="item in all_type_org_list"
                    :key="item.value"
                    :command="{value:item.value,label:item.label,flag:2}"
                  > {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>

            <el-form-item label class="searchFormItem">
              <el-input v-model="input" placeholder="请输入内容" clearable class="input-with-select">
                <el-select slot="prepend" v-model="select" placeholder="请输入内容" style="width:110px;">
                  <el-option label="社区编码" value="Code" />
                  <el-option label="社区名称" value="Name" />
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
            @click="add_community"
          >新增</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="write_community"
          >修改</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="delete_Community"
          >
            删除</el-button>
        </div>
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
            prop="code"
            label="社区编码"
            width="220"
            align="center"
          />
          <el-table-column
            prop="name"
            label="社区名称"
            width="150"
            align="center"
          />
          <el-table-column
            prop="areaAddress"
            label="所属城市"
            width="180"
            sortable
            align="center"
          />
          <el-table-column
            prop="groupLeaderFullName"
            label="社区群主"
            width="200"
            sortable
            align="center"
          />
          <el-table-column
            prop="assistantFullName"
            label="社区助手"
            width="150"
            sortable
            align="center"
          />
          <el-table-column
            prop="memberCount"
            label="社区成员"
            width="150"
            sortable
            align="center"
          />
          <el-table-column
            prop="createdUTC"
            label="创建时间"
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
            prop="isActived"
            label="状态"
            sortable
            width="150"
            align="center"
          />
          <el-table-column
            prop="customerName"
            label="操作"
            min-width="80"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="medium"
                @click="handleEdit(scope.row.id)"
              >查看</el-button>
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
import { communitySearch, deleteCommunity } from '@/api/community'
import { searchCity } from '@/api/city'
import { offset } from '@/utils/offset'
export default {
  data() {
    return {
      offset: 8,
      searchForm: {
        goodsName: ''
      },
      listLoading: false,
      select: 'Code',
      input: '',
      // 分页
      total: 200,
      currentPage: 1,
      tableData: [],
      tableStyle: 'width:100%;',
      flag: false,
      show_list_line: true,
      multipleSelection: [],
      all_city: '全部城市',
      all_city_list: [{
        value: 'all',
        label: '全部城市'
      }],
      all_type_org: '全部状态',
      all_type_org_list: [{
        value: 'all',
        label: '全部状态'
      }, {
        value: true,
        label: '有效'
      }, {
        value: false,
        label: '无效'
      }],
      data: {
        'data': {
          'numberPerPage': 10,
          'currentPage': 1,
          'filters': []
        }
      },
      isCommand1: '',
      isCommand2: '',
      command_value1: '',
      command_value2: ''
    }
  },
  created() {
    this.fetchData()
    this.fetchCity()
  },
  mounted() {
    this.offset = offset()
  },
  methods: {
    // 拉取城市列表
    fetchCity() {
      var data = {
        'filters': [
          {
            'key': 'CityLevel',
            'value': '1'
          }
        ],
        'numberPerPage': 200,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 0
          }
        ]
      }
      searchCity(data).then(res => {
        console.log('我是请求城市列表', res.data)
        var arrCity = []
        for (var i = 0; i < res.data.length; i++) {
          arrCity.push({ value: res.data[i].cityCode, label: res.data[i].name },)
        }
        this.all_city_list = this.all_city_list.concat(arrCity)
        console.log('我是本地城市列表', this.all_city_list)
      })
    },
    // 获取表格数据
    fetchData() {
      this.listLoading = true
      this.data = {
        'data': {
          'isNeedMemberNum': true, // 是否需要显示群成员个数
          'numberPerPage': 10,
          'currentPage': this.currentPage,
          'sortList': [
            // {
            //   'columnName': 'Id',
            //   'sortOrder': 0
            // },
            {
              'columnName': 'CreatedUTC',
              'sortOrder': 1
            }
          ],
          'filters': [
            {
              'filterLogic': 0,
              'key': 'CreatedUTC',
              'filterType': 4,
              'value': '08/09/2018 07:13:53'
            }
          ]
        }
      }
      this.AxiosIfo()
    },
    // 删除社区
    delete_Community() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        if (this.multipleSelection[this.multipleSelection.length - 1].memberCount > 0) {
          this.$message({
            type: 'success',
            message: '当前还有群成员，不能删除社区!'
          })
        } else {
          this.$confirm('是否要删除该条?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var data = {
              'id': this.multipleSelection[this.multipleSelection.length - 1].id
            }
            deleteCommunity(data).then(res => {
              console.log('社区删除结果', res)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.fetchData()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection[this.multipleSelection.length - 1].id)
      // console.log("我是群成员个数",this.multipleSelection[this.multipleSelection.length-1].memberCount)
    },
    // 修改按钮点击
    write_community() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        var id = this.multipleSelection[0].id
        this.$router.push({
          path: '/community/community_list/write_community',
          query: {
            id: id
          }
        })
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    // 新增社区
    add_community() {
      this.$router.push('/community/community_list/add_community')
    },
    // 查看单个社区  路由跳转 传参
    handleEdit(id) {
      // console.log(index, row);
      this.$router.push({
        path: '/community/community_list/look_community',
        query: {
          id: id
        }
      })
    },

    // 输入过滤
    getFilter() {
      this.currentPage = 1
      console.log(this.data.data)
      this.data.data.currentPage = 1
      this.data.data.filters = []
      this.listLoading = true
      if (this.isCommand1 == 'AreaCode' && this.command_value1 !== 'all') {
        var obj1 = {
          'key': 'AreaCode',
          'value': this.command_value1
        }
        this.data.data.filters.push(obj1)
      }
      if (this.isCommand2 == 'IsActived' && this.command_value2 !== 'all') {
        var obj2 = {
          'key': 'IsActived',
          'value': this.command_value2
        }
        this.data.data.filters.push(obj2)
      }
      if (this.input !== '') {
        var obj3 = {
          'key': this.select,
          'value': this.input
        }
        this.data.data.filters.push(obj3)
      }
      if (this.input == '' && this.isCommand1 == '' && this.isCommand2 == '') {
        this.AxiosIfo()
      }
      this.AxiosIfo()
    },
    // 分页
    handleCurrentChange(val) {
      // console.log(val)
      this.currentPage = val
      this.data.data.filters = []
      this.data.data.currentPage = val
      this.listLoading = true
      if (this.isCommand1 == 'AreaCode' && this.command_value1 !== 'all') {
        var obj1 = {
          'key': 'AreaCode',
          'value': this.command_value1
        }
        this.data.data.filters.push(obj1)
      }
      if (this.isCommand2 == 'IsActived' && this.command_value2 !== 'all') {
        var obj2 = {
          'key': 'IsActived',
          'value': this.command_value2
        }
        this.data.data.filters.push(obj2)
      }
      if (this.input !== '') {
        var obj3 = {
          'key': this.select,
          'value': this.input
        }
        this.data.data.filters.push(obj3)
      }
      if (this.input == '' && this.isCommand1 == '' && this.isCommand2 == '') {
        this.AxiosIfo()
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
    // select 点击
    handleCommand(command) {
      // console.log('我是command_value1',this.command_value1)
      switch (command.flag) {
        case 1:
          this.all_city = command.label
          this.isCommand1 = 'AreaCode'
          this.command_value1 = command.value
          break
        case 2:
          this.all_type_org = command.label
          this.isCommand2 = 'IsActived'
          this.command_value2 = command.value
          break
        default:
          return
      }
    },
    // 请求
    AxiosIfo() {
      communitySearch(this.data).then(res => {
        if (res.data.length == 0) {
          this.$message({
            message: '暂无数据',
            type: 'warning'
          })
        }
        const Data = JSON.parse(JSON.stringify(res.data))
        Data.forEach((item, index) => {
          if (item.isActived == true) {
            item.isActived = '有效'
          }
          if (item.isActived == false) {
            item.isActived = '无效'
          }
        })
        console.log('所有社区', res.data)
        this.listLoading = false
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
