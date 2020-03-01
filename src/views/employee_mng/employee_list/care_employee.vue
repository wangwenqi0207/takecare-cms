<template>
  <div id="employeeCareMng" class="page_container" style="overflow:auto;height:100%;background: #ffffff;min-width:1200px;">
    <div v-if="isNative" style="height:100%;">
      <div style="height:100%;">
        <el-tabs v-model="activeName" style="height:100%;" @tab-click="handleClick">
          <el-tab-pane v-if="IsShow1" label="全部" name="first" style="height:100%;">
            <all-employee tab-id="first" :table-data="tab1" style="height:100%;" :current-page1="currentPage1" :total-items1="totalItems1" @updateData="updateData" @handleCurrentChange="handleCurrentChange" />
          </el-tab-pane>
          <el-tab-pane v-if="IsShow2" label="待审核" name="second" style="height:100%;">
            <employee-audit :table-data="tab2" tab-id="second" style="height:100%;" :current-page1="currentPage2" :total-items1="totalItems2" @updateData="updateData" @handleCurrentChange="handleCurrentChange" />
          </el-tab-pane>
          <el-tab-pane v-if="IsShow3" label="审核通过" name="third" style="height:100%;">
            <employee-pass :table-data="tab3" tab-id="third" style="height:100%;" :current-page1="currentPage3" :total-items1="totalItems3" @updateData="updateData" @handleCurrentChange="handleCurrentChange" />
          </el-tab-pane>
          <el-tab-pane v-if="IsShow4" label="审核未通过" name="fourth" style="height:100%;">
            <employee-out :table-data="tab4" tab-id="fourth" style="height:100%;" :current-page1="currentPage4" :total-items1="totalItems4" @updateData="updateData" @handleCurrentChange="handleCurrentChange" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div v-else style="height:100%;">
      <router-view />
    </div>
  </div>
</template>
<script>
import allEmployee from './all_employee'
import employeeAudit from './wait_audit'
import employeePass from './audit_pass'
import employeeOut from './audit_out'
import { staffSearch } from '@/api/nursingStaff'
// 权限测试
import permissionData from '@/utils/resPermission'

export default {
  name: 'OrderTabs',
  components: { allEmployee, employeeAudit, employeePass, employeeOut },
  data() {
    return {
      isNative: true,
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
      sortList: [
        {
          'columnName': 'CreatedUTC',
          'sortOrder': 1
        }
      ],
      IsShow1: false,
      IsShow2: false,
      IsShow3: false,
      IsShow4: false
    }
  },
  created() {
    if (this.$route.path === '/employee_mng/care_employee/all_employee') {
      this.isNative = true
    } else {
      this.isNative = false
    }
  },
  mounted() {
    this.apiDataTest()
    this.getIsShow(permissionData('全部护理人员'), 1)
    this.getIsShow(permissionData('待审核护理人员'), 2)
    this.getIsShow(permissionData('审核通过护理人员'), 3)
    this.getIsShow(permissionData('审核未通过护理人员'), 4)
    if (this.IsShow1) {
      this.activeName = 'first'
    } else if (this.IsShow2) {
      this.activeName = 'second'
    } else if (this.IsShow3) {
      this.activeName = 'third'
    } else if (this.IsShow4) {
      this.activeName = 'fourth'
    }
    if (this.$route.query.tab) {
      this.activeName = this.$route.query.tab
    }
  },
  methods: {
    getIsShow(obj, type) {
      for (var prop in obj) {
        if (obj[prop]) {
          switch (type) {
            case 1:
              this.IsShow1 = true
              break
            case 2:
              this.IsShow2 = true
              break
            case 3:
              this.IsShow3 = true
              break
            case 4:
              this.IsShow4 = true
              break
          }
        }
        // //prop对应 obj中的”name”,”age”,”sex”
        // //因为底层原理obj.prop --->obj[‘prop’]所以遍历之后没有结果
        // console.log(obj.prop);// 错误遍历方式
        // console.log(obj[prop]);//正确遍历方式
      }
    },
    apiDataTest() {
      staffSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList }).then(res => {
        if (res) {
          this.tab1 = res.data
          this.currentPage1 = 1
          this.totalItems1 = res.pager.totalItems
        }
      })
      staffSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Status', 'value': '0' }] }).then(res => {
        if (res) {
          this.tab2 = res.data
          this.currentPage2 = 1
          this.totalItems2 = res.pager.totalItems
        }
      })
      staffSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Status', 'value': '1' }] }).then(res => {
        if (res) {
          this.tab3 = res.data
          this.currentPage3 = 1
          this.totalItems3 = res.pager.totalItems
        }
      })
      staffSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Status', 'value': '2' }] }).then(res => {
        if (res) {
          this.tab4 = res.data
          this.currentPage4 = 1
          this.totalItems4 = res.pager.totalItems
        }
      })
      // // 长护险接口调试
      // orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '0' }] }).then(res => {
      //   this.tab1 = res.data
      //   this.currentPage1 = 1
      //   this.totalItems1 = res.pager.totalItems
      //   console.log(res)
      // })
      // orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '0' }, { 'key': 'OrderStatus', 'value': '0' }] }).then(res => {
      //   this.tab2 = res.data
      //   this.currentPage2 = 1
      //   this.totalItems2 = res.pager.totalItems
      //   console.log(res)
      // })
      // orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '0' }, { 'key': 'OrderStatus', 'value': '1' }] }).then(res => {
      //   this.tab3 = res.data
      //   this.currentPage3 = 1
      //   this.totalItems3 = res.pager.totalItems
      //   console.log(res)
      // })
      // orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '0' }, { 'key': 'OrderStatus', 'value': '2' }] }).then(res => {
      //   this.tab4 = res.data
      //   this.currentPage4 = 1
      //   this.totalItems4 = res.pager.totalItems
      //   console.log(res)
      // })
      // orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '0' }, { 'key': 'OrderStatus', 'value': '3' }] }).then(res => {
      //   this.tab5 = res.data
      //   this.currentPage5 = 1
      //   this.totalItems5 = res.pager.totalItems
      //   console.log(res)
      // })
      // orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '0' }, { 'key': 'OrderStatus', 'value': '4' }] }).then(res => {
      //   this.tab6 = res.data
      //   this.currentPage6 = 1
      //   this.totalItems6 = res.pager.totalItems
      //   console.log(res)
      // })
      // orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '0' }, { 'key': 'OrderStatus', 'value': '5' }] }).then(res => {
      //   this.tab7 = res.data
      //   this.currentPage7 = 1
      //   this.totalItems7 = res.pager.totalItems
      //   console.log(res)
      // })
      // orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': [{ 'key': 'Type', 'value': '0' }, { 'key': 'OrderStatus', 'value': '6' }] }).then(res => {
      //   this.tab8 = res.data
      //   this.currentPage8 = 1
      //   this.totalItems8 = res.pager.totalItems
      //   console.log(res)
      // })

      // // 获取所有机构列表
      // orgSearch({ 'numberPerPage': 10, 'currentPage': 1 }).then(res => {
      //   if (res) {
      //     this.orgList = res.data
      //   } else {
      //     this.$message({
      //       message: '获取列表失败',
      //       type: 'warning'
      //     })
      //   }
      // })
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
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event)
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
</style>
<style lang='scss'>
#employeeCareMng .el-tabs__content {
  height:calc(100% - 55px);
}
</style>

