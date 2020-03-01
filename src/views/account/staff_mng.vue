<template>
  <div id="staffMng" class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div v-if="isNative" style="height:100%;">
      <div style="height:100%;padding:0px 20px;">
        <el-tabs v-model="activeName" style="height:100%;" @tab-click="handleClick">
          <el-tab-pane v-if="IsShow1" label="员工账号" name="first" style="height:100%;">
            <employee-account />
          </el-tab-pane>
          <el-tab-pane v-if="IsShow2" label="代理人账号" name="second" style="height:100%;">
            <agent-account />
          </el-tab-pane>
          <el-tab-pane v-if="IsShow3" label="部门设置" name="third" style="height:100%;">
            <department-mng />
          </el-tab-pane>
          <el-tab-pane v-if="IsShow4" label="角色权限设置" name="fourth" style="height:100%;">
            <role-permission />
          </el-tab-pane>
          <el-tab-pane v-if="IsShow5" label="城市管理" name="five" style="height:100%;">
            <city-mng />
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
import agentAccount from '@/views/account/agent_account.vue'
import employeeAccount from '@/views/account/employee_account.vue'
import departmentMng from '@/views/account/department_mng.vue'
import cityMng from '@/views/account/city_mng.vue'
import rolePermission from '@/views/account/role_permission.vue'
// 权限测试
import permissionData from '@/utils/resPermission'

export default {
  components: {
    // <my-component> 将只在父组件模板中可用
    agentAccount,
    employeeAccount,
    departmentMng,
    cityMng,
    rolePermission
  },
  data() {
    return {
      isNative: true,
      activeName: 'first',
      IsShow1: false,
      IsShow2: false,
      IsShow3: false,
      IsShow4: false,
      IsShow5: false
      // IsShow1: true,
      // IsShow2: true,
      // IsShow3: true,
      // IsShow4: true,
      // IsShow5: true
    }
  },
  created() {
    if (this.$route.path === '/account/staff_mng') {
      this.isNative = true
    } else {
      this.isNative = false
    }
  },
  mounted() {
    this.getIsShow(permissionData('员工账号'), 1)
    this.getIsShow(permissionData('代理人账号'), 2)
    this.getIsShow(permissionData('部门设置'), 3)
    this.getIsShow(permissionData('角色权限设置'), 4)
    this.getIsShow(permissionData('城市管理'), 5)
    if (this.IsShow1) {
      this.activeName = 'first'
    } else if (this.IsShow2) {
      this.activeName = 'second'
    } else if (this.IsShow3) {
      this.activeName = 'third'
    } else if (this.IsShow4) {
      this.activeName = 'fourth'
    } else if (this.IsShow5) {
      this.activeName = 'five'
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
            case 5:
              this.IsShow5 = true
              break
          }
        }
        // //prop对应 obj中的”name”,”age”,”sex”
        // //因为底层原理obj.prop --->obj[‘prop’]所以遍历之后没有结果
        // console.log(obj.prop);// 错误遍历方式
        // console.log(obj[prop]);//正确遍历方式
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
#staffMng .el-tabs__content {
  height:calc(100% - 55px);
}
</style>
