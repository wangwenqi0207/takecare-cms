<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;">
      <div v-if="isNative" style="height:100%;">
        <div style="height:100%;">
          <!-- {{ tabId }} -->
          <div class="search_bar">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item label>
                <el-dropdown trigger="click" class="rela" @command="handleCommandType">
                  <span class="el-dropdown-link">
                    <span v-if="flag1">{{ flag1 }}</span>
                    <span v-else>订单类型</span>
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{flag:'1',label:'订单类型',value:''}">订单类型</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'1',label:'生活照料',value:'0'}">生活照料</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'1',label:'医疗护理',value:'1'}">医疗护理</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'1',label:'机构护理',value:'2'}">机构护理</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'1',label:'护理器材出售',value:'3'}">护理器材出售</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'1',label:'护理器材租赁',value:'4'}">护理器材租赁</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'1',label:'社区标准订单',value:'5'}">社区标准订单</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'1',label:'社区定制订单',value:'6'}">社区定制订单</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'1',label:'长护险订单',value:'7'}">长护险订单</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'1',label:'保险服务',value:'8'}">保险服务</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
              <el-form-item>
                <el-dropdown trigger="click" class="rela" @command="handleCommandType">
                  <span class="el-dropdown-link">
                    <span v-if="flag2">{{ flag2 }}</span>
                    <span v-else>账单状态</span>
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{flag:'2',label:'全部状态',value:''}">全部状态</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'2',label:'待支付',value:'1'}">待支付</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'2',label:'已支付',value:'2'}">已支付</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'2',label:'已支付(已退款)',value:'3'}">已支付(已退款)</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
              <el-form-item>
                <el-dropdown trigger="click" class="rela" @command="handleCommandType">
                  <span class="el-dropdown-link">
                    <span v-if="flag3">{{ flag3 }}</span>
                    <span v-else>付款方式</span>
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{flag:'3',label:'全部方式',value:''}">全部方式</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'3',label:'微信',value:'0'}">微信</el-dropdown-item>
                    <el-dropdown-item :command="{flag:'3',label:'支付宝',value:'1'}">支付宝</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
              <el-form-item label>
                <el-input v-model="searchForm.order_no" class="searchInput_300" placeholder="请输入支付用户/用户姓名/订单编号" clearable>
                  <el-select slot="prepend" v-model="searchForm.type" placeholder="请选择" class="input-with-select" style="width:120px">
                    <el-option label="支付用户" value="1" />
                    <el-option label="用户姓名" value="2" />
                    <el-option label="订单编号" value="3" />
                  </el-select>
                <!-- <el-button slot="append" icon="el-icon-search" @click.prevent="searchData" /> -->
                </el-input>
              <!-- <el-input
            v-model="searchForm.order_no"
            class="searchInput_300"
            placeholder="请输入订单编码/购买用户"
            clearable
            size="small"
          /> -->
              </el-form-item>
              <el-form-item label="支付日期">
                <el-date-picker
                  v-model="searchForm.pay_date"
                  class="searchInput_400"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                />
              <!-- <el-date-picker
                v-model="searchForm.pay_date"
                class="searchInput_400"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
              /> -->
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="searchData">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="tableList" style="height: 80%;overflow: auto;">
            <table border="1" cellpadding="0" cellspacing="0" border-collapse="collapse" class="table">
              <thead class="table_head">
                <tr style="border-color:rgb(221,221,221)">
                  <th style="border-left:1px solid rgb(221, 221, 221)" width="10%">
                    <!-- <el-checkbox v-model="all_check" /> -->
                    <span>订单类型</span>
                  </th>
                  <th width="20%">商品名称</th>
                  <!-- <th width="8%">价格</th> -->
                  <th width="10%">商品类型</th>
                  <th width="10%">商品分类</th>
                  <th>实付金额</th>
                  <th>付款方式</th>
                  <th>账单状态</th>
                  <!-- <th>订单状态</th> -->
                  <th width="20%">操作</th>
                </tr>
              </thead>
              <tbody v-for="item in tableData" :key="item.id">
                <tr style="height:20px;border:none" />
                <tr class="tr_item">
                  <td colspan="8">
                    <div class="fl_box" style="width:100%">
                      <!-- <div class="flt mar_right_40 mar_left_20">
                        <el-checkbox :name="item.id" />
                      </div> -->
                      <div class="flt mar_right_40" style="margin-left:10px;">
                        <span>支付时间：</span>
                        <span v-if="item.paymentTime">{{ $moment(item.paymentTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                        <span v-else>{{ item.paymentTime }}</span>
                      </div>
                      <div class="flt mar_right_40">
                        <span>订单编号：</span>
                        <span>{{ item.orderNumber }}</span>
                      </div>
                      <div class="flt mar_right_40">
                        <span>支付用户：</span>
                        <span>{{ item.customerId }}</span>
                      </div>
                      <div class="flt mar_right_40">
                        <span>用户姓名：</span>
                        <span>{{ item.customerName }}</span>
                      </div>
                      <div class="flt mar_right_40">
                        <span>收款对象：</span>
                        <!-- <span>{{ item.customerName }}</span> -->
                        <span>平台</span>
                      </div>
                    <!-- <div v-if="item.type==0||item.type==1||item.type==2" class="flt mar_right_40">
                      <span>护理机构：</span>
                      <span>{{ item.organizationName }}</span>
                    </div>
                    <div v-else-if="item.type==8" class="flt">
                      <div class="flt mar_right_40">
                        <span>参保人姓名：</span>
                        <span>{{ item.organizationName }}</span>
                      </div>
                      <div class="flt mar_right_40">
                        <span>护理所属月份：</span>
                        <span>{{ item.organizationName }}</span>
                      </div>
                    </div>
                    <div v-else class="flt mar_right_40">
                      <span>商户：</span>
                      <span>{{ item.organizationName }}</span>
                    </div> -->
                    </div>
                  </td>
                <!-- <td>
                  <div style="text-align:center">
                    <el-button type="text" @click.prevent="checkDetail(item.type,item.id)">查看详情</el-button>
                  </div>
                </td> -->
                </tr>
                <tr v-for="(orderItem,index) in item.orderItems" :key="index">
                  <td v-if="index==0">{{ typeMap[item.type] }}</td>
                  <td v-if="index==0" class="font_bold">{{ orderItem.name }}</td>
                  <!-- <td v-if="index==0">
                  <div v-if="orderItem.subDisCount">
                    <s class="text-del">￥{{ orderItem.subDisCount }}</s>
                  </div>
                  <div>
                    <span>￥{{ orderItem.price }}</span>
                  </div>
                </td> -->
                  <td v-if="index==0" :rowspan="item.orderItems.length">{{ typeGoodsMap[orderItem.type] }}</td>
                  <td v-if="index==0" :rowspan="item.orderItems.length">{{ categoryMap[orderItem.category] }}</td>
                  <td v-if="index==0" :rowspan="item.orderItems.length">￥{{ item.actualTotalPrice }}</td>
                  <td v-if="index==0" :rowspan="item.orderItems.length">
                    <p v-if="item.paymentType == 0">微信</p>
                    <p v-else-if="item.paymentType == 1">支付宝</p>
                    <p v-else>{{ item.paymentType }}</p>
                  </td>
                  <td v-if="index==0" :rowspan="item.orderItems.length">
                    <p v-if="item.orderStatus == 0">已支付</p>
                    <p v-else-if="item.orderStatus == 3"><span style="color:red;">待支付</span></p>
                    <p v-else-if="item.orderStatus == 5">已支付<span style="color:red;">&nbsp;&nbsp;(已退款)&nbsp;&nbsp;</span></p>
                    <p v-else>{{ item.orderStatus }}</p>
                  </td>
                  <td v-if="index==0" :rowspan="item.orderItems.length">
                    <el-button type="primary" size="small" @click="toDetail(item.id)">查看详情</el-button>
                  </td>
                  <td v-if="index!=0">{{ typeMap[item.type] }}</td>
                  <td v-if="index!=0" class="font_bold">{{ orderItem.name }}</td>
                <!-- <td v-if="index!=0">
                  <div v-if="orderItem.subDisCount">
                    <s class="text-del">￥{{ orderItem.subDisCount }}</s>
                  </div>
                  <div>
                    <span>￥{{ orderItem.price }}</span>
                  </div>
                </td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div class="page_nation">
            <el-pagination
              style="margin-top:30px;"
              :current-page="currentPage"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="total"
              @current-change="handleCurrentChange"
            />
          <!-- <el-pagination
        v-else
        style="margin-top:30px;"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      /> -->
          </div>
        </div>
      </div>
      <div v-else style="height:100%;">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { orderSearch } from '@/api/order'
import { offset } from '@/utils/offset'

export default {
  name: 'TotalOrder',
  data() {
    return {
      offset: 8,
      isNative: true,
      tableData: [],
      sortList: [
        {
          'columnName': 'PaymentTime',
          'sortOrder': 1
        }
      ],
      tableIdNew: '',
      searchForm: {
        order_no: '',
        type: '1',
        pay_date: ''
      },
      user: {
        name: 'mike',
        age: '18',
        sex: '男'
      },
      all_check: false,
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      total: 200,
      // tableData: '',
      typeMap: {
        '0': '生活照料',
        '1': '医疗护理',
        '2': '机构护理',
        '3': '护理器材出售',
        '4': '护理器材租赁',
        '5': '社区标准订单',
        '6': '社区定制订单',
        '7': '长护险'
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
      orderStatusMap: {
        '0': '待确认',
        '1': '待派单',
        '2': '待派护理员|待发货|待入住|待服务',
        '3': '待用户确认',
        '4': '已完成',
        '5': '退单中',
        '6': '已退单',
        '7': '未通过'
      },

      // 当前操作的订单ID
      currentOrderId: '',
      // search
      flag1: '',
      flag1Val: '',
      flag2: '',
      flag2Val: '',
      flag3: '',
      flag3Val: '',
      // 搜索数据
      filterData: [],
      fromDate: '',
      toDate: ''

    }
  },
  created() {
    if (this.$route.path === '/account_mng/user_account') {
      this.isNative = true
    } else {
      this.isNative = false
    }
  },
  mounted() {
    if (this.$route.path === '/account_mng/user_account') {
      this.getData()
    }
    this.offset = offset()
  },
  methods: {
    toDetail(id) {
      console.log(id)
      this.$router.push({ path: `/account_mng/user_account/detail`, query: { id: id }})
    },
    getData() {
      orderSearch({ 'currentPage': this.currentPage, 'numberPerPage': 10, 'filters': this.filterData, 'fromDate': this.fromDate, 'toDate': this.toDate, sortList: this.sortList }).then(res => {
        this.tableData = res.data
        //    this.currentPage = 1
        this.total = res.pager.totalItems
        console.log(res)
      })
    },
    // 搜索赋值
    handleCommandType(command) {
      if (command.flag === '1') {
        this.flag1 = command.label
        this.flag1Val = command.value
      }
      if (command.flag === '2') {
        this.flag2 = command.label
        this.flag2Val = command.value
      }
      if (command.flag === '3') {
        this.flag3 = command.label
        this.flag3Val = command.value
      }

      // this.$message.info(command)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    searchData() {
      // console.log( this.flag1,this.flag1Val,this.flag2,this.flag2Val,this.flag3,this.flag3Val,this.searchForm.pay_date,this.searchForm.type,this.searchForm.order_no)
      this.filterData = []
      if (this.searchForm.type && this.searchForm.order_no) {
        if (this.searchForm.type == 1) {
          var objFilter = {
            'key': 'CustomerId',
            'value': this.searchForm.order_no
          }
          this.filterData.push(objFilter)
        } else if (this.searchForm.type == 2) {
          var objFilter = {
            'key': 'CustomerName',
            'value': this.searchForm.order_no
          }
          this.filterData.push(objFilter)
        } else if (this.searchForm.type == 3) {
          var objFilter = {
            'key': 'OrderNumber',
            'value': this.searchForm.order_no
          }
          this.filterData.push(objFilter)
        }
      }
      if (this.flag1Val) {
        var objFilter = {
          'key': 'Type',
          'value': this.flag1Val
        }
        this.filterData.push(objFilter)
      }
      if (this.flag2Val) {
        var objFilter = {
          'key': 'OrderStatus',
          'value': this.flag2Val
        }
        this.filterData.push(objFilter)
      }

      if (this.flag3Val) {
        var objFilter = {
          'key': 'PaymentType',
          'value': this.flag3Val
        }
        this.filterData.push(objFilter)
      }
      // if (this.searchForm.pay_date) {
      //   var objFilter = {
      //     'key': 'PaymentTime',
      //     'value': this.$moment(this.searchForm.pay_date).format('YYYY-MM-DD')
      //   }
      //   this.filterData.push(objFilter)
      // }
      var startDate = ''
      var endDate = ''
      this.fromDate = ''
      this.endDate = ''
      if (this.searchForm.pay_date && this.searchForm.pay_date.length > 0) {
        // startDate = this.$moment(this.searchForm.pay_date[0]).format('YYYY-MM-DD')
        // endDate = this.$moment(this.searchForm.pay_date[1]).format('YYYY-MM-DD')
        startDate = new Date(this.$moment(this.searchForm.pay_date[0]).format('YYYY-MM-DD HH:mm:ss')).toISOString()
        endDate = new Date(this.$moment(this.searchForm.pay_date[1]).format('YYYY-MM-DD HH:mm:ss')).toISOString()
        this.fromDate = startDate
        this.toDate = endDate
      }
      // console.log(this.filterData)
      this.currentPage = 1
      this.getData()
    }

  }
}
</script>
<style scoped lang='scss'>
.el-dropdown-menu {
  top: 180px !important;
}
.searchInput_300 {
  width: 430px;
}
.searchInput_400 {
  width: 400px;
}
.fl_box {
  overflow: hidden;
}
.flt {
  float: left;
}
.flr {
  float: right;
}
.mar_left_20 {
  margin-left: 20px;
}
.mar_right_40 {
  margin-right: 40px;
}
.font_bold {
  font-weight: bold;
}
.text-del {
  color: #aaaaaa;
}
</style>
<style scoped lang='scss'>
.table {
  width: 100%;
  border: 1px solid transparent;
  border-collapse: collapse;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  tr {
    text-align: center;
    border: 1px solid #e2f1fc;
    height: 40px;
  }
  td {
    height: 60px;
    border-right: 1px solid #e2f1fc;
  }
  .tr_item {
    text-align: left;
    vertical-align: middle;
    line-height: 40px;
    border: 1px solid #e2f1fc;
    background: #e5f4ff;
    font-size: 14px;
  }
}
.table_head {
  font-weight: 400;
  th {
    font-weight: normal;
    height: 50px;
    background: rgb(238, 241, 250);
    border-right: 1px solid rgb(221, 221, 221);
    border-left: none;
    border-top: 1px solid rgb(221, 221, 221);
  }
}
</style>

