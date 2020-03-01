<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;">
      <table style="width:60%;text-align:left;line-height:30px;color:#828282;">
        <tr>
          <td style="width:15%;font-weight:700;font-size:18px;">实付金额：</td>
          <td style="width:30%;font-weight:700;font-size:22px;color:#41C5FF;">￥<span style="font-size:30px;">{{ orderDetailData.actualTotalPrice }}</span></td>
          <td style="width:15%" />
          <td style="width:30%" />
        </tr>
        <tr>
          <td style="width:15%">订单编号：</td>
          <td style="width:30%">{{ orderDetailData.orderNumber }}</td>
          <td style="width:15%">订单类型：</td>
          <td style="width:30%">{{ typeMap[orderDetailData.type] }}</td>
        </tr>
        <tr>
          <td style="width:15%">支付时间：</td>
          <td v-if="orderDetailData.paymentTime" style="width:30%">{{ $moment(orderDetailData.paymentTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</td>
          <td v-else style="width:30%">{{ orderDetailData.paymentTime }}</td>
          <td style="width:15%">支付方式：</td>
          <td style="width:30%">{{ orderDetailData.paymentType?'支付宝':'微信' }}</td>
        </tr>
        <tr>
          <td style="width:15%">{{ orderDetailData.paymentType?'支付宝':'微信' }}交易号：</td>
          <td style="width:30%">{{ orderDetailData.transactionNumber }}</td>
          <td style="width:15%">账单状态：</td>
          <td style="width:30%">{{ orderDetailData.orderStatus }}</td>
        </tr>
        <tr>
          <td style="width:15%">支付用户：</td>
          <td style="width:30%">{{ orderDetailData.customerId }}</td>
          <td style="width:15%">用户姓名：</td>
          <td style="width:30%">{{ orderDetailData.customerName }}</td>
        </tr>
      </table>
      <hr style="background-color:#ccc;height:1px;border:none;margin:20px 0px;">
      <el-table
        :data="orderDetailData.orderItems"
        border
        style="width:60%;"
        class="table_border"
        highlight-current-row
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="mini"
      >
        <el-table-column
          prop="name"
          label="商品名称"
          :resizable="false"
        />
        <el-table-column
          prop="type"
          label="商品类型"
          :resizable="false"
        >
          <template slot-scope="scope">
            <span>{{ typeGoodsMap[scope.row.type] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品分类"
          :resizable="false"
        >
          <template slot-scope="scope">
            <span>{{ categoryMap[scope.row.category] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import { getOrderInfo } from '@/api/order'
import { offset } from '@/utils/offset'

export default {
  name: 'DirectivePermission',
  directives: { permission },
  data() {
    return {
      // tableData: '',
      offset: 8,
      typeMap: {
        '0': '生活照料',
        '1': '医疗护理',
        '2': '机构护理',
        '3': '护理器材出售',
        '4': '护理器材租赁',
        '5': '社区标准订单',
        '6': '社区定制订单',
        '7': '长护险服务'
      },
      typeGoodsMap: {
        '1': '生活照料',
        '2': '医疗护理',
        '3': '机构护理',
        '4': '护理器材',
        '5': '长护险护理包',
        '6': '保险服务'
      },
      categoryMap: {
        '1001': '单日套餐',
        '1002': '包月套餐',
        '1003': '单项服务',
        '2001': '单项服务',
        '3001': '月床位费',
        '4001': '自助餐具',
        '4002': '排泄设备',
        '4003': '起居设备',
        '4004': '洗浴用品',
        '4005': '移动设备',
        '4006': '智能硬件',
        '5001': '长护险月套餐',
        '6001': '健康险',
        '6002': '意外责任险'
      },
      orderDetailData: ''
    }
  },
  mounted() {
    getOrderInfo({ id: this.$route.query.id }).then(res => {
      this.orderDetailData = res
    })
    this.offset = offset()
  },
  methods: {
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

<style scoped>
.line{
  text-align: center;
}
</style>

