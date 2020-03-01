<template>
  <div id="communityCareMng" class="page_container" style="overflow:auto;background: #ffffff;min-width:1200px;">
    <div v-if="isNative">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <basic />
          </el-tab-pane>
          <el-tab-pane label="包含小区" name="second" style="height:100%;">
            <housing />
          </el-tab-pane>
          <el-tab-pane label="社区成员" name="third" style="height:100%;">
            <member />
          </el-tab-pane>
          <el-tab-pane label="社区公告" name="fourth" style="height:100%;">
            <notice />
          </el-tab-pane>
          <el-tab-pane label="社区订单" name="fifth" style="height:100%;">
            <order />
          </el-tab-pane>
          <el-tab-pane label="聊天记录" name="sixth" style="height:100%;">
            <chat />
          </el-tab-pane>
          <el-tab-pane label="申请记录" name="seventh" style="height:100%;">
            <apply />
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
import basic from './pages/basic'
import housing from './pages/housing'
import member from './pages/member'
import notice from './pages/notice'
import order from './pages/order'
import chat from './pages/chat'
import apply from './pages/apply'

export default {
  name: 'LookCommunity',
  components: {
    basic, housing, member, notice, order, chat, apply
  },
  data() {
    return {
      isNative: true,
      activeName: 'first'
    }
  },
  created() {
    if (this.$route.path === '/community/community_list/look_community') {
      this.isNative = true
    } else {
      this.isNative = false
    }
  },
  methods: {
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
#communityCareMng .el-tabs__content {
  height:calc(100% - 55px);
}
</style>

