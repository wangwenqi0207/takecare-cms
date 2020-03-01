//所在群社区
<template>
  <div style="height:100%;box-sizing:border-box;">
    <div style="height:100%;padding:20px;padding-top:0px;padding-bottom:0px;">
      <el-table
        v-loading="listLoading"
        class="table_border"
        :data="list"
        border
        highlight-current-row
        height="90%"
        :style="tableStyle"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="mini"
      >
        <el-table-column prop="communityId" label="群社区号" width="300" />
        <el-table-column prop="communityName" label="群社区名称" />
        <el-table-column prop="areaAddress" label="群社区所在地">
          <template slot-scope="scope">
            <p>{{ scope.row.areaAddress+''+scope.row.streetOrTownAddress }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="identity" label="群身份">
          <template slot-scope="scope">
            <p v-if="scope.row.identity==0">成员</p>
            <p v-else-if="scope.row.identity==1">助手(群管理员)</p>
            <p v-else-if="scope.row.identity==2">群主</p>
            <p v-else>{{ scope.row.identity }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="createdUTC" label="加入时间">
          <template slot-scope="scope">
            <p v-if="scope.row.createdUTC">{{ $moment(scope.row.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm') }}</p>
            <p v-else>{{ scope.row.createdUTC }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="remove(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px;"
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
import { usercommunitymemberlist, deleteCommunitymember } from '@/api/community'
import { offset } from '@/utils/offset'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      isNative: true,
      activeName: 'first',
      list: [],
      listLoading: true,
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      total: 0,
      value: '',
      searchForm: {
        goodsName: ''
      },
      searchClass: [{
        value: '1',
        label: '单日套餐'
      }, {
        value: '2',
        label: '包月套餐'
      }, {
        value: '3',
        label: '单项服务'
      }, {
        value: '4',
        label: '月床位费'
      }, {
        value: '5',
        label: '自助餐具'
      }, {
        value: '6',
        label: '排泄设备用品'
      }, {
        value: '7',
        label: '起居（床）设备用品'
      }, {
        value: '8',
        label: '洗浴用品'
      }, {
        value: '9',
        label: '移动设备器具'
      }, {
        value: '10',
        label: '智能硬件'
      }
      ],
      goods_type: [{
        value: '1',
        label: '生活照料'
      }, {
        value: '2',
        label: '医疗护理'
      }, {
        value: '3',
        label: '机构护理'
      }, {
        value: '4',
        label: '护理器材'
      }, {
        value: '5',
        label: '保险服务'
      }
      ],
      input3: '',
      select: '1',
      checked: true,
      multipleSelection: [],
      tableStyle: 'width:100%;',
      filterData: {
        data: {
          'numberPerPage': 10,
          'currentPage': 1,
          'filters': []
        }
      },
      // 时间相关
      offset: 8
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.offset = offset()
  },
  methods: {
    addUser() {
      this.$router.push('/account/user_mng/create')
    },
    updateEmployee() {
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fetchData() {
      this.listLoading = true
      usercommunitymemberlist({ id: this.$route.query.id, data: this.filterData }).then(res => {
        if (res) {
          this.list = res.data
          this.total = res.pager.totalItems
        } else {
          this.$message({
            type: 'info',
            message: '获取数据失败'
          })
        }
      })
      this.listLoading = false
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.filterData.currentPage = val
      this.fetchData()
    },
    filterShow(value, row, column) {
    },
    filterChange(filters) {
    },
    remove(id) {
      this.$confirm('确定要移除该所在社区吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCommunitymember({ id: id }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '移除成功!'
            })
            this.currentPage = 1
            this.filterData.currentPage = 1
            this.fetchData()
          } else {
            this.$message({
              type: 'warning',
              message: '移除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        })
      })
    },
    // 表格连续排序
    indexMethod(index) {
      return (this.currentPage - 1) * 6 + index + 1
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
<style lang="scss">
#agentAccount .el-tabs__content{
  height: 96%;
}
</style>
<style lang="scss" scoped>
.el-icon-search {
  font-size: 20px;
}
.rela{
  position: relative;
}
.searchFormItem{
  width: 300px;
  .el-form-item__content{
    width: 100%
  }
}
</style>
