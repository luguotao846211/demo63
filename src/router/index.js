import Vue from 'vue'
import Router from 'vue-router'
import loginRouter from '@/components/login'
import mainRouter from '@/components/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'zs',
      component: loginRouter
    },
    {
      path: '/login',
      name: 'login',
      component: loginRouter
    },
    {
      path: '/index',
      name: 'main',
      component: mainRouter
    }
  ]
})
