<template>
  <div id="order">
    <div class="housing_button">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label class="searchFormItem">
          <el-input v-model="input" placeholder="请输入内容" class="input-with-select">
            <el-select slot="prepend" v-model="select" placeholder="请输入内容" style="width:110px;">
              <el-option label="订单编号" value="OrderNumber" />
              <el-option label="购买用户" value="CustomerName" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getFilter" />
          </el-input>
        </el-form-item>
      </el-form>
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
          prop="orderNumber"
          align="center"
          label="订单编号"
        />
        <el-table-column
          prop="type"
          align="center"
          label="订单类型"
          width="220"
        />
        <el-table-column
          prop="paymentTime"
          align="center"
          label="支付时间"
          width="240"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.paymentTime">{{ $moment(scope.row.paymentTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</p>
            <p v-else>{{ scope.row.paymentTime }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="dealPrice"
          align="center"
          label="实付金额"
          width="180"
        />
        <el-table-column
          prop="customerName"
          align="center"
          label="购买用户"
          width="200"
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
</template>

<script>
import { orderSearch } from '@/api/order'
import { offset } from '@/utils/offset'

export default {
  name: 'Order',
  data() {
    return {
      offset: 8,
      listLoading: false,
      input: '',
      select: 'OrderNumber',
      // 分页
      currentPage: 1,
      total: 200,
      tableData: [],
      tableStyle: 'width:100%;',
      org_name: '',
      show_list_line: true,
      multipleSelection: [],
      textarea: '',
      order_name: '',
      searchForm: {
        goodsName: ''
      },
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
    fetchData() {
      this.data = {
        'filters': [
          {
            'key': 'OrderCommunity',
            'value': this.$route.query.id
          }
        ],
        'orderTypes': [
          5,
          6
        ],
        'numberPerPage': 10,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'CreatedUTC',
            'sortOrder': 1
          }
        ]
      }
      this.AxiosIfo()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      if (this.input == '') {
        this.data = {
          'filters': [
            {
              'key': 'OrderCommunity',
              'value': this.$route.query.id
            }
          ],
          'orderTypes': [
            5,
            6
          ],
          'numberPerPage': 10,
          'currentPage': this.currentPage,
          'sortList': [
            {
              'columnName': 'CreatedUTC',
              'sortOrder': 1
            }
          ]
        }
      } else {
        this.data = {
          'filters': [
            {
              'filterLogic': 0,
              'key': this.select,
              'filterType': 0,
              'value': this.input
            },
            {
              'key': 'OrderCommunity',
              'value': this.$route.query.id
            }
          ],
          'orderTypes': [
            5,
            6
          ],
          'numberPerPage': 10,
          'currentPage': this.currentPage,
          'sortList': [
            {
              'columnName': 'CreatedUTC',
              'sortOrder': 1
            }
          ]
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
      // console.log(this.input)
      if (this.input == '') {
        this.data = {
          'filters': [
            {
              'key': 'OrderCommunity',
              'value': this.$route.query.id
            }
          ],
          'orderTypes': [
            5,
            6
          ],
          'numberPerPage': 10,
          'currentPage': this.currentPage,
          'sortList': [
            {
              'columnName': 'Id',
              'sortOrder': 0
            }
          ]
        }
      } else {
        this.data = {
          'filters': [
            {
              'filterLogic': 0,
              'key': this.select,
              'filterType': 0,
              'value': this.input
            },
            {
              'key': 'OrderCommunity',
              'value': this.$route.query.id
            }
          ],
          'orderTypes': [
            5,
            6
          ],
          'numberPerPage': 10,
          'currentPage': this.currentPage,
          'sortList': [
            {
              'columnName': 'Id',
              'sortOrder': 0
            }
          ]
        }
      }
      this.AxiosIfo()
    },
    // 获取信息
    AxiosIfo() {
      orderSearch(this.data).then(res => {
        console.log('社区订单', res)
        const Data = JSON.parse(JSON.stringify(res.data))
        Data.forEach((item, index) => {
          if (item.type == 0) {
            item.type = '生活照料'
          }
          if (item.type == 1) {
            item.type = '医疗护理'
          }
          if (item.type == 2) {
            item.type = '机构护理'
          }
          if (item.type == 3) {
            item.type = '护理器材出售'
          }
          if (item.type == 4) {
            item.type = '护理器材租赁'
          }
          if (item.type == 5) {
            item.type = '社区标准订单'
          }
          if (item.type == 6) {
            item.type = '社区个性订单'
          }
          if (item.type == 7) {
            item.type = '保险服务'
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
<style scoped lang="scss">
.tableList{
  margin-top:20px;
}
.dialog-footer{
  display:flex;
  justify-content: center;
}
.dialog-footer .el-button:nth-child(1){
  margin-right: 30px;
}
.searchFormItem{
  width: 300px;
  .el-form-item__content{
    width: 100%
  }
}
.searchFormItem{
  .el-form-item__content{
    width: 100%!important
  }
}
.table_border{
  border: 1px solid #ddd;
}
</style>
