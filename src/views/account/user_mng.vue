<template>
  <div id="userMng" class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div v-if="isNative" style="height:100%;">
      <div style="height:100%;padding:0px 20px;">
        <el-tabs v-model="activeName" style="height:100%;" @tab-click="handleClick">
          <el-tab-pane v-if="IsShow1" label="用户列表" name="first" style="height:100%;">
            <user-list />
          </el-tab-pane>
          <el-tab-pane v-if="IsShow2" label="用户黑名单" name="second" style="height:100%;">
            <user-black-list />
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
import userList from '@/views/account/user_list.vue'
import userBlackList from '@/views/account/user_black_list.vue'
// 权限测试
import permissionData from '@/utils/resPermission'

export default {
  components: {
    // <my-component> 将只在父组件模板中可用
    'user-list': userList,
    'user-black-list': userBlackList
  },
  data() {
    return {
      isNative: true,
      activeName: 'first',
      IsShow1: false,
      IsShow2: false
    }
  },
  created() {
    if (this.$route.path === '/account/user_mng') {
      this.isNative = true
    } else {
      this.isNative = false
    }
  },
  mounted() {
    this.getIsShow(permissionData('用户列表'), 1)
    this.getIsShow(permissionData('用户列表黑名单'), 2)
    if (this.IsShow1) {
      this.activeName = 'first'
    } else if (this.IsShow2) {
      this.activeName = 'second'
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
#userMng .el-tabs__content {
  height:calc(100% - 55px);
}
</style>
