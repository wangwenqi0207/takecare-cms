import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getTokenLocal } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

import Layout from '@/layout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/'] // no redirect whitelist

var getRouter

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getTokenLocal()
  // const hasToken = true

  if (hasToken) {
    if (to.path === '/') {
      // console.log('1')
      // if is logged in, redirect to the home page
      // next({ path: '/' })
      next()
      NProgress.done()
    } else {
      // if(!getRouter)这一步判断很重要，如果没有，路由就会陷入死循环
      if (!getRouter) {
        if (getObjArr('testRouter') && getObjArr('testRouter') !== []) {
          getRouter = getObjArr('testRouter')
          routerGo(to, next)
          // next();
        } else {
          // 如果清除了缓存，就没有this，会报错
          // this.$router.push({ path: '/' })
          next({ path: '/' })
          // window.location.href = 'http://192.168.1.115:8081/#/'
        }
      } else {
        next()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
function getObjArr(name) {
  // localStorage 获取数组对象的方法

  return JSON.parse(window.localStorage.getItem(name))
}
function routerGo(to, next) {
  getRouter = filterAsyncRouter1(getRouter) // 过滤路由
  router.addRoutes(getRouter)// 动态添加路由
  // 添加找不到路由页面
  router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
  // global.antRouter = getRouter;  //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
}
function filterAsyncRouter1(asyncRouterMap) {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters2 = asyncRouterMap.filter(route1 => {
    if (route1.component) {
      if (route1.component === 'Layout') {
        // Layout组件特殊处理
        route1.component = Layout
      } else {
        // route.component = _import(route.component);
        route1.component = require('@/views/' + route1.component + '.vue').default
      }
    }
    if (route1.children && route1.children.length) {
      route1.children = filterAsyncRouter1(route1.children)
    }
    return true
  })
  return accessedRouters2
}
