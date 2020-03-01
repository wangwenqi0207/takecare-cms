import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '../router/index'
import { getCookie, delCookie } from '@/utils/cookie'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true
// create an axios instance
const service = axios.create({
  // baseURL: '', // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://118.178.155.206:6004/api', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// console.log(Cookies.get('key'))
// console.log(Cookies.set('333', '666'))
// console.log(Cookies.set('.AspNetCore.Identity.Application', '666'))
// console.log(Cookies.set('3333333333333', '6668888888888'))
// console.log(Cookies.remove('333'))
// console.log('666666666')
// console.log('11111', getCookie('.AspNetCore.Identity.ApplicationC1'))
// delCookie('.AspNetCore.Identity.ApplicationC1')
// delCookie('.AspNetCore.Identity.ApplicationC2')
// delCookie('.AspNetCore.Identity.ApplicationC3')
// delCookie('.AspNetCore.Identity.ApplicationC4')
// console.log('222222', getCookie('.AspNetCore.Identity.ApplicationC1'))
// console.log('0000000000000000000')
// Cookies.remove('key') // fail!
// Cookies.remove('.AspNetCore.Identity.Application') // fail!
// Cookies.remove('BDORZ') // fail!

// delCookie1('.AspNetCore.Identity.Application', '192.168.1.166')
// function delCookie1(name, domain) {
//   document.cookie = name + '=' + getCookie(name) + ';expires=' + (new Date(1)) + ';domain=' + domain + ';path=/'
// }
// service.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser
// request interceptor
service.interceptors.request.use(
  config => {
    // 在请求前做一些操作，如添加token
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    // return config
    if (window.localStorage.getItem('accessToken')) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('accessToken')
    }
    // config.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // 关键所在
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // const res = response.data

    // // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }

    // 后端返回不一致，没有办法统一拦截
    // if (response.data.resultCode != '000000') {
    //   // return Promise.reject(new Error(response.data.resultMsg || 'Error'))
    //   return Promise.reject(new Error('服务器错误' || 'Error'))
    // } else {
    //   return response.data
    // }
    if (response.data) {
      return response.data
    } else {
      return response
    }
  },
  error => {
    // console.log(error) // for debug
    console.log('6004', error.response)
    if (error.response.data.error) {
      Message({
        message: error.response.data.error,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.response.data.title,
        type: 'error',
        duration: 5 * 1000
      })
    }
    if (error.response.status == 401) {
      // console.log('333333333333333')
      // status
      router.replace({
        path: '/'
      })
      // window.location.href = '/'
    }
    // checkStatus(error.response)
    return Promise.reject(error)
  }
)

// 封装了一个检测返回结果的函数，与后台返回状态码code === 1002表示token失效
let isRefreshing = true
function checkStatus(response) {
  if (response && response.status == 401) {
    // 刷新token的函数,这需要添加一个开关，防止重复请求
    if (isRefreshing) {
      refreshTokenRequst()
    }
    isRefreshing = false
    // 这个Promise函数很关键
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber(() => {
        resolve(request(url, options))
      })
    })
    return retryOriginalRequest
  } else {
    return response
  }
}
// 刷新token的请求函数
function refreshTokenRequst() {
  let data
  const refreshToken = window.localStorage.getItem('refreshToken')
  // data={
  //     token: 'YXBwYXBpczpaSWxhQUVJdsferTeweERmR1praHk=',
  //     refreshToken,
  // }
  axios.request({
    baseURL: process.env.VUE_APP_BASE_API_3,
    url: `/users/refresh/${refreshToken}`,
    method: 'get'
  }).then((response) => {
    window.localStorage.setItem('refreshToken', response.refreshToken)
    window.localStorage.setItem('accessToken', response.accessToken)
    onAccessTokenFetched()
    isRefreshing = true
  })
}
// Promise函数集合
let subscribers = []
function onAccessTokenFetched() {
  subscribers.forEach((callback) => {
    callback()
  })
  subscribers = []
}
function addSubscriber(callback) {
  subscribers.push(callback)
}
// 总结：其实token失效，自动刷新token，在页面只有一个请求的时候是比较好处理的，但是如果页面同时有多个请求，并且都会产生token失效，这就需要一些稍微复杂的处理，解决方式主要是用了Promise 函数来进行处理。每一个token失效的请求都会存到一个Promise函数集合里面，当刷新token的函数执行完毕后，才会批量执行这些Promise函数，返回请求结果。还有一点要注意一下，这儿设置一个刷新token的开关isRefreshing，这个是非常有必要的，防止重复请求。
export default service
