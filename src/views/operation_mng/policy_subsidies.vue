
<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div v-if="isNative" style="height:100%;">
      <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;">
        <div class="search_bar">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item
              label
              class="searchFormItem"
            >
              <el-input
                v-model="searchForm.name"
                class="input"
                placeholder="请输入：政策名称"
                clearable
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchData"
                />
              </el-input>
            </el-form-item>
            <el-button
              v-if="resourcePermission['删除']"
              type="primary"
              size="medium"
              style="float:right;margin-left:10px;"
              class="el-icon-delete"
              @click="deletePolicy"
            >删除</el-button>
            <el-button
              v-if="resourcePermission['修改']"
              type="primary"
              size="medium"
              style="float:right;"
              class="el-icon-edit-outline"
              @click="updatePolicy"
            >修改</el-button>
            <el-button v-if="resourcePermission['新增']" type="primary" size="medium" style="float:right;" class="el-icon-plus" @click="addPolicy">新增</el-button>
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
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="id"
              label="序号"
              width="180"
            />
            <el-table-column
              prop="name"
              label="政策名称"
              width="300"
            />
            <el-table-column
              prop="userParticipationStatusValue"
              label="用户"
              sortable
              width="260"
            />
            <el-table-column
              prop="subsidySchemeProductTypes"
              label="商品类型"
              sortable
              width="260"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.subsidySchemeProductTypes.length!=0">
                  <span v-for="(item,index) in scope.row.subsidySchemeProductTypes" :key="index">
                    {{ subsidySchemeMap[item.typeId] }}
                  </span>
                </div>
                <div v-else>暂无</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="timeIsCustom"
              label="使用时间"
              sortable
              width="270"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.timeIsCustom">
                  {{ scope.row.startTime?$moment(scope.row.startTime+'Z').utcOffset(offset).format('YYYY年MM月DD日'):'' }}&nbsp;&nbsp;至&nbsp;&nbsp;{{ scope.row.endTime?$moment(scope.row.endTime+'Z').utcOffset(offset).format('YYYY年MM月DD日'):'' }}
                </p>
                <p v-else>
                  不限
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="isActived"
              label="状态"
              sortable
              width="120"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.isActived">
                  有效
                </p>
                <p v-else>
                  无效
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="action"
              label="操作"
              min-width="120"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="medium"
                  @click="handleEdit(scope.$index, scope.row)"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page_nation" style="margin-top:26px;">
          <!-- <el-pagination
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="100"
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
      </div>
    </div>
    <div v-else style="height:100%;">
      <router-view />
    </div>
  </div>
</template>

<script>
import { policyAdd, policySearch, policyDelete } from '@/api/subsidyschemes.js'
import permissionData from '@/utils/resPermission'
import { offset } from '@/utils/offset'

export default {
  data() {
    return {
      offset: 8,
      filterData: {
        'numberPerPage': 10,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 1
          }
        ],
        'filters': [
        ]
      },
      isNative: true,
      searchForm: {
        name: ''
      },
      listLoading: false,
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      total: 0,
      tableData: [],
      tableStyle: 'width:100%;',
      org_name: '',
      flag: false,
      show_list_line: true,
      multipleSelection: [],
      value1: '全部类型',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      subsidySchemeMap: {
        '1': '生活照料',
        '2': '医疗护理',
        '3': '机构护理',
        '4': '护理器材',
        '7': '长护险护理包'
        // '6': '保险服务'
      },
      // 权限相关
      resourcePermission: []
    }
  },
  created() {
    if (this.$route.path === '/operation_mng/policy_subsidies') {
      this.isNative = true
    } else {
      this.isNative = false
    }
  },
  mounted() {
    this.getSearchData()
    this.resourcePermission = permissionData('政策补贴')
    this.offset = offset()
  },
  methods: {
    getSearchData() {
      if (this.$route.path === '/operation_mng/policy_subsidies') {
        policySearch(this.filterData).then(res => {
          // console.log(res)
          this.tableData = res.data
          this.total = res.pager.totalItems
        })
      }
    },
    searchData() {
      this.filterData.filters = []
      if (this.searchForm.name) {
        var filter = {
          'key': 'Name',
          'value': this.searchForm.name,
          'filterType': 5
        }
        this.filterData.filters.push(filter)
      }
      this.currentPage = 1
      this.filterData.currentPage = 1
      this.getSearchData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 修改按钮点击
    updatePolicy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$router.push({ path: '/operation_mng/policy_subsidies/update', query: { id: this.multipleSelection[0].id }})
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    // 新增机构
    addPolicy() {
      this.$router.push('/operation_mng/policy_subsidies/add')
    },
    deletePolicy() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$confirm('是否要删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          policyDelete({ id: this.multipleSelection[0].id }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getSearchData()
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败'
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
    // 查看个人资料  路由跳转 传参
    handleEdit(index, row) {
      this.$router.push({ path: '/operation_mng/policy_subsidies/detail', query: { id: row.id }})
      //   this.$router.push({
      //     name: 'look_org',
      //     params: {
      //       index,
      //       row
      //     }
      //   })
    },
    // fetchData() {
    //   this.listLoading = true
    //   goodsList({ size: 10 }).then(response => {
    //     this.tableData = response.data.items.slice(1, 11)
    //     this.listLoading = false
    //   })
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.filterData.currentPage = val
      this.getSearchData()
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
  top: 190px !important;
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
</style>

