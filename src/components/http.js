import axios from 'axios'
import Message from 'element-ui'
// import Vue from 'vue'
const MyPlugin = {}
MyPlugin.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  axios.interceptors.request.use(function (config) {
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  axios.interceptors.response.use(function (response) {
    const {data: {meta: {msg , status }}} = response
    if(status!==201&&status!==200) {
      Message.Message.error(msg)
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}
export default MyPlugin
