import Vue from 'vue'
import Router from 'vue-router'
import loginRouter from '@/components/login'
import mainRouter from '@/components/main'
import shoppingList from '@/components/commodity/list'
import classification from '@/components/commodity/classification'
import parameter from '@/components/commodity/parameter'

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
      component: mainRouter,
      children: [{
        path: '/shoplist',
        name: 'shoplist',
        component: shoppingList
      },
      {
        path: '/classification',
        name: 'classification',
        component: classification
      },
      {
        path: '/parameter',
        name: 'parameter',
        component: parameter
      }]
    }
  ]
})
