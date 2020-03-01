import 'babel-polyfill' // ie下兼容 es6等
import Vue from 'vue'
// import Vue from 'vue/dist/vue.js'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import '@/assets/iconfont/iconfont.css'

// 引入axios
import axios from 'axios'

Vue.prototype.$axios = axios // 将axios挂载在Vue实例原型上

// 设置axios请求的token
// axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
// 设置请求头
// axios.defaults.headers.post['Content-type'] = 'application/json'
import { setCookie, getCookie, delCookie } from '@/utils/cookie'
Vue.prototype.$cookieStore = { setCookie, getCookie, delCookie }

import moment from 'moment'// 导入文件

Vue.prototype.$moment = moment// 赋值使用
moment.locale('zh-cn')// 需要汉化

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
