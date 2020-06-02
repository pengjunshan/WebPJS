
import Vue from 'vue'

//网络请求插件
import axios from 'axios'
//配置请求的跟路径
axios.defaults.baseURL = 'http://220.189.213.2:44045/pressure-meter/meterController'
// axios.defaults.baseURL = '/api'
axios.interceptors.request.use(config => {
  //当进入request拦截器，表示发送了请求，我们就开启进度条

  // 在最后必须 return config
  return config
})

axios.interceptors.response.use(
  response => {
    //当进入response拦截器，表示请求已经结束，我们就结束进度条


    // console.log('成功='+response)
    //拦截响应，做统一处理 
    // if (response.data.code) {
    //   switch (response.data.code) {
    //     case 1002:
    //       store.state.isLogin = false
    //       router.replace({
    //         path: 'login',
    //         query: {
    //           redirect: router.currentRoute.fullPath
    //         }
    //       })
    //   }
    // }
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    // console.log('失败='+error)
    // return Promise.reject(error.response.status) // 返回接口返回的错误信息
    return error // 返回接口返回的错误信息
  })

//把axios挂载到Vue原型上
Vue.prototype.$http = axios
