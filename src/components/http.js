import axios from 'axios'
import Vue from 'vue'
const MyPlugin={}
MyPlugin.install = function (Vue) {
    Vue.prototype.$myMethod = function (methodOptions) {
    }
  }
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'