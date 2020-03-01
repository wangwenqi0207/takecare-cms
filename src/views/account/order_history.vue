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
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column prop="orderNumber" label="订单编号" />
        <el-table-column prop="createdUTC" label="订单创建时间">
          <template slot-scope="scope">
            <span v-if="scope.row.createdUTC">{{ $moment(scope.row.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
            <span v-else>{{ scope.row.createdUTC }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paymentTime" label="订单支付时间">
          <template slot-scope="scope">
            <span v-if="scope.row.paymentTime">{{ $moment(scope.row.paymentTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
            <span v-else>{{ scope.row.paymentTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="订单类型">
          <template slot-scope="scope">
            <span>{{ typeMap[scope.row.type] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="actualTotalPrice" label="订单金额">
          <template slot-scope="scope">
            <p>￥{{ scope.row.actualTotalPrice }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="paymentType" label="支付方式">
          <template slot-scope="scope">
            <p v-if="scope.row.orderStatus==0">
              待支付
            </p>
            <p v-else-if="scope.row.paymentType==0">微信</p>
            <p v-else-if="scope.row.paymentType==1">支付宝</p>
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
import { orderSearch } from '@/api/order'
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
      typeMap: {
        '0': '生活照料',
        '1': '医疗护理',
        '2': '机构护理',
        '3': '护理器材出售',
        '4': '护理器材租赁',
        '5': '社区标准订单',
        '6': '社区个性订单',
        '7': '长护险服务'
      },
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
        'numberPerPage': 10,
        'currentPage': 1,
        'filters': [
        ],
        sortList: [
          {
            'columnName': 'CreatedUTC',
            'sortOrder': 1
          }
        ]
      },
      // 时间相关
      offset: 8

    }
  },
  created() {
    this.fetchData()
    // 查询该用户相关的关注的人
    var obj = {
      'key': 'CustomerId',
      'value': this.$route.query.id
      // 'value': '30000191'
    }
    this.filterData.filters.push(obj)
  },
  mounted() {
    this.offset = offset()
  },
  methods: {
    addUser() {
      this.$router.push('/account/user_mng/create')
    },
    updateEmployee() {
      console.log(this.multipleSelection)
      // console.log($("input:checkbox:checked"))
      // $("input:checkbox[name=所有的checkboxname同名]:checked").each(function(){
      // 		//操作
      // 	});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fetchData() {
      this.listLoading = true
      orderSearch(this.filterData).then(res => {
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
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.filterData.currentPage = val
      this.fetchData()
    },
    filterShow(value, row, column) {
      console.log(value, row, column)
    },
    filterChange(filters) {
      console.log(filters)
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
// .el-dropdown-menu{
//   top: 190px !important;
// }
// .searchInput{
//   width: 80%;
// }
.searchFormItem{
  width: 300px;
  .el-form-item__content{
    width: 100%
  }
}
</style>
