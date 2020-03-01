<template>
  <div id="allOrder" class="page_container" style="overflow:auto;height:100%">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" style="height:100%;">
        <template slot-scope="scope" style="height:100%;">
          <div :class="scope" style="height:100%;">
            <totalOrder :table-data="tab1" tab-id="first" style="height:100%;" :total-items1="totalItems1" @updateData="updateData" @handleCurrentChange="handleCurrentChange">
              <!-- <template v-slot:default="slotProps">
                {{ slotProps.user.age }}
              </template> -->
              <!-- <template v-slot="{user = {sex:'nv'}}">
                {{ user.sex }}
              </template> -->
            </totalOrder>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="second" style="height:100%;">
        <template slot-scope="scope" style="height:100%;">
          <div :class="scope" style="height:100%;">
            <totalOrder :table-data="tab2" tab-id="second" style="height:100%;" :current-page1="currentPage2" :total-items1="totalItems2" @updateData="updateData" @handleCurrentChange="handleCurrentChange" />
          </div>
        </template>
      </el-tab-pane>
      <!-- <el-tab-pane label="待派单" name="third" style="height:100%;">
        <template slot-scope="scope" style="height:100%;">
          <div :class="scope" style="height:100%;">
            <totalOrder :table-data="tab3" tab-id="third" style="height:100%;" :current-page1="currentPage3" :total-items1="totalItems3" @updateData="updateData" @handleCurrentChange="handleCurrentChange">
            </totalOrder>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="待入住" name="fourth" style="height:100%;">
        <template slot-scope="scope" style="height:100%;">
          <div :class="scope" style="height:100%;">
            <totalOrder :table-data="tab4" tab-id="fourth" style="height:100%;" :current-page1="currentPage4" :total-items1="totalItems4" @updateData="updateData" @handleCurrentChange="handleCurrentChange">
            </totalOrder>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="待用户确认" name="five" style="height:100%;">
        <template slot-scope="scope" style="height:100%;">
          <div :class="scope" style="height:100%;">
            <totalOrder :table-data="tab5" tab-id="five" style="height:100%;" :current-page1="currentPage5" :total-items1="totalItems5" @updateData="updateData" @handleCurrentChange="handleCurrentChange">
            </totalOrder>
          </div>
        </template>
      </el-tab-pane> -->
      <el-tab-pane label="已完成" name="six" style="height:100%;">
        <template slot-scope="scope" style="height:100%;">
          <div :class="scope" style="height:100%;">
            <totalOrder :table-data="tab6" tab-id="six" style="height:100%;" :current-page1="currentPage6" :total-items1="totalItems6" @updateData="updateData" @handleCurrentChange="handleCurrentChange" />
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="退单中" name="seven" style="height:100%;">
        <template slot-scope="scope" style="height:100%;">
          <div :class="scope" style="height:100%;">
            <totalOrder :table-data="tab7" tab-id="seven" style="height:100%;" :current-page1="currentPage7" :total-items1="totalItems7" @updateData="updateData" @handleCurrentChange="handleCurrentChange" />
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="已退单" name="eight" style="height:100%;">
        <template slot-scope="scope" style="height:100%;">
          <div :class="scope" style="height:100%;">
            <totalOrder :table-data="tab8" tab-id="eight" style="height:100%;" :current-page1="currentPage8" :total-items1="totalItems8" @updateData="updateData" @handleCurrentChange="handleCurrentChange" />
          </div>
        </template>
      </el-tab-pane>
      <!-- <el-tab-pane label="已退单" name="eight">
        <template slot-scope="scope">
          <div :class="scope">
            <totalOrder :table-data="tab2" tab-id="eight" @updateData="updateData" @handleCurrentChange="handleCurrentChange">
            </totalOrder>
          </div>
        </template>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { orderSearch, getOrderInfo, orderUpdate, orderDelete, orderPage, orderInfo, orderConfirmrefund, cancelOrder, adminConfirmOrder } from '@/api/order'
// import { orderSearch, getOrderInfo } from '@/api/orderBD'

import totalOrder from './total_order'
export default {
  name: 'OrderTabs',
  components: { totalOrder },
  data() {
    return {
      activeName: 'first',
      tab1: [],
      currentPage1: 1,
      totalItems1: 0,
      tab2: [],
      currentPage2: 1,
      totalItems2: 0,
      tab3: [],
      currentPage3: 1,
      totalItems3: 0,
      tab4: [],
      currentPage4: 1,
      totalItems4: 0,
      tab5: [],
      currentPage5: 1,
      totalItems5: 0,
      tab6: [],
      currentPage6: 1,
      totalItems6: 0,
      tab7: [],
      currentPage7: 1,
      totalItems7: 0,
      tab8: [],
      currentPage8: 1,
      totalItems8: 0,
      tabId: '全部',
      sortList: [
        {
          'columnName': 'CreatedUTC',
          'sortOrder': 1
        }
        // {
        //   'columnName': 'PaymentTime',
        //   'sortOrder': 1
        // }
      ]
    }
  },
  mounted() {
    this.apiDataTest()
  },
  methods: {
    apiDataTest() {
      orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '7' }] }).then(res => {
        this.tab1 = res.data
        this.currentPage1 = 1
        this.totalItems1 = res.pager.totalItems
        console.log(res)
      })
      orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '0' }] }).then(res => {
        this.tab2 = res.data
        this.currentPage2 = 1
        this.totalItems2 = res.pager.totalItems
        console.log(res)
      })
      // orderSearch({ 'data': { 'currentPage': 1, 'numberPerPage': 10, 'filters': [{ 'key': 'Type', 'value': '2' }, { 'key': 'OrderStatus', 'value': '1' }] }}).then(res => {
      //   this.tab3 = res.data
      //   this.currentPage3 = 1
      //   this.totalItems3 = res.pager.totalItems
      //   console.log(res)
      // })
      // orderSearch({ 'data': { 'currentPage': 1, 'numberPerPage': 10, 'filters': [{ 'key': 'Type', 'value': '2' }, { 'key': 'OrderStatus', 'value': '2' }] }}).then(res => {
      //   this.tab4 = res.data
      //   this.currentPage4 = 1
      //   this.totalItems4 = res.pager.totalItems
      //   console.log(res)
      // })
      // orderSearch({ 'data': { 'currentPage': 1, 'numberPerPage': 10, 'filters': [{ 'key': 'Type', 'value': '2' }, { 'key': 'OrderStatus', 'value': '3' }] }}).then(res => {
      //   this.tab5 = res.data
      //   this.currentPage5 = 1
      //   this.totalItems5 = res.pager.totalItems
      //   console.log(res)
      // })
      orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '4' }] }).then(res => {
        this.tab6 = res.data
        this.currentPage6 = 1
        this.totalItems6 = res.pager.totalItems
        console.log(res)
      })
      orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '5' }] }).then(res => {
        this.tab7 = res.data
        this.currentPage7 = 1
        this.totalItems7 = res.pager.totalItems
        console.log(res)
      })
      orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '6' }] }).then(res => {
        this.tab8 = res.data
        this.currentPage8 = 1
        this.totalItems8 = res.pager.totalItems
        console.log(res)
      })

      // var obj = {
      //   'data': {
      //     'numberPerPage': 10,
      //     'currentPage': 1,
      //     'sortList': [
      //       {
      //         'columnName': 'Id',
      //         'sortOrder': 0
      //       }
      //     ],
      //     'filters': [
      //       {
      //         'key': 'OrderNumber',
      //         'value': '20190722-0001'
      //       }
      //     ]
      //   },
      //   'correlationId': '0c41954d-c4e9-4caf-81b1-534c55ad7022',
      //   'invokingUser': '5d5b9e3b-1107-41c5-b605-acf9bf40379c',
      //   'businessProcessName': 'SearchOrderService'
      // }
      // orderSearch(obj).then(res => {
      //   console.log('请求成功')
      // })
      // getOrderInfo({ id: '2ada79e3-7031-41d3-a615-ba9c8771fc8e' }).then(res => {
      //   console.log('请求成功')
      // })
      // var updateObj = {
      //   id: '2ada79e3-7031-41d3-a615-ba9c8771fc8e',
      //   operationRequest: {
      //     'data': {
      //       'communityUser': 'string',
      //       'orderCommunity': 'string',
      //       'serviceDate': '2019-07-22T07:44:24.444',
      //       'address': 'string',
      //       'contactPerson': 'string',
      //       'phoneNumber': 'string',
      //       'remark': 'string',
      //       'serviceRequirement': 'string',
      //       'referencePrice': 0,
      //       'expiration': '2019-07-22T07:44:24.444',
      //       'fromDate': '2019-07-22T07:44:24.444',
      //       'toDate': '2019-07-22T07:44:24.444',
      //       'dealUser': 'string',
      //       'dealPrice': 0,
      //       'id': '08d70e7a-4880-7fde-8dad-4312f4e89e18'
      //     },
      //     'correlationId': '2ca7adf5-f122-4a46-b0e0-3805c3c397ff',
      //     'invokingUser': '3b4c813f-42ce-41d5-97d6-687d2473a0d6',
      //     'businessProcessName': 'OrderCreateService'
      //   }
      // }
      // orderUpdate(updateObj).then(res => {
      //   console.log('请求成功')
      // })
      // // orderDelete({id:'63624941-af32-415f-976a-0e4e41a72592'}).then(res=>{
      // //   console.log('请求成功')
      // // })
      // orderPage({ 'data.numberPerPage': 10, 'data.currentPage': 1 }).then(res => {
      //   console.log('请求成功')
      // })
      // orderInfo({ 'id': '08d70e95-1749-78c2-4fe8-cff6a271a9a8' }).then(res => {
      //   console.log('请求成功')
      // })
      // orderConfirmrefund({ 'id': '08d70e95-1749-78c2-4fe8-cff6a271a9a8' }).then(res => {
      //   console.log('请求成功')
      // })
      // cancelOrder({ 'id': '08d70e95-1749-78c2-4fe8-cff6a271a9a8' }).then(res => {
      //   console.log('请求成功')
      // })
      // adminConfirmOrder({ 'id': '08d70e95-1749-78c2-4fe8-cff6a271a9a8' }).then(res => {
      //   console.log('请求成功')
      // })
    },
    handleClick(tab, event) {
      // console.log('')
    },
    updateData(res) {
      console.log(res.id)
      if (res.data.length == 0) {
        this.$message('暂无数据')
      }
      if (res.id === 'first') {
        this.tab1 = res.data
        // this.currentPage1 = res.currentPage;
        this.totalItems1 = res.totalItems
      } else if (res.id === 'second') {
        this.tab2 = res.data
        this.totalItems2 = res.totalItems
      } else if (res.id === 'third') {
        this.tab3 = res.data
        this.totalItems3 = res.totalItems
      } else if (res.id === 'fourth') {
        this.tab4 = res.data
        this.totalItems4 = res.totalItems
      } else if (res.id === 'five') {
        this.tab5 = res.data
        this.totalItems5 = res.totalItems
      } else if (res.id === 'six') {
        this.tab6 = res.data
        this.totalItems6 = res.totalItems
      } else if (res.id === 'seven') {
        this.tab7 = res.data
        this.totalItems7 = res.totalItems
      } else if (res.id === 'eight') {
        this.tab8 = res.data
        this.totalItems8 = res.totalItems
      }
    },
    handleCurrentChange(res) {
      console.log('888', res.id)
      if (res.id === 'first') {
        this.tab1 = res.data
        this.totalItems1 = res.totalItems
      } else if (res.id === 'second') {
        this.tab2 = res.data
        this.totalItems2 = res.totalItems
      } else if (res.id === 'third') {
        this.tab3 = res.data
        this.totalItems3 = res.totalItems
      } else if (res.id === 'fourth') {
        this.tab4 = res.data
        this.totalItems4 = res.totalItems
      } else if (res.id === 'five') {
        this.tab5 = res.data
        this.totalItems5 = res.totalItems
      } else if (res.id === 'six') {
        this.tab6 = res.data
        this.totalItems6 = res.totalItems
      } else if (res.id === 'seven') {
        this.tab7 = res.data
        this.totalItems7 = res.totalItems
      } else if (res.id === 'eight') {
        this.tab8 = res.data
        this.totalItems8 = res.totalItems
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.page_container{
    background: #ffffff;
    padding: 10px;
    height: 100%
}
.el-tabs{
  height: 100%;
}
</style>
<style>
#allOrder .el-tabs__content{
  height: calc( 100% - 60px)!important;
  overflow: auto;
}
</style>

