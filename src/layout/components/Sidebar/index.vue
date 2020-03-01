<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" /> -->
        <sidebar-item v-for="route in testRouter" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      testRouter: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    // 返回高亮路径
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      //  // if set path, the sidebar will highlight the path you set
      // if (meta.activeMenu) {
      //   return meta.activeMenu
      // }
      // return path

      // console.log( '66', meta.activeMenu, path)
      var dataPath = path.split('/')
      var dataPath1 = '/' + dataPath[1] + '/' + dataPath[2]
      // console.log( dataPath1 );
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return dataPath1
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    this.testRouter = JSON.parse(window.localStorage.getItem('testRouter'))
    // console.log( this.testRouter )
    // this.testRouter.length=1
  }
}
</script>
