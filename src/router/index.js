import Vue from 'vue'
import Router from 'vue-router'
import loginRouter from '@/components/login'
import mainRouter from '@/components/main'
import shoppingList from '@/components/commodity/list'
import classification from '@/components/commodity/classification'
import parameter from '@/components/commodity/parameter'
import dataForm from '@/components/data/reportForm'
import jurisdiction from '@/components/jurisdiction/jurisdiction'
import role from '@/components/jurisdiction/role'
import orderList from '@/components/order/orderList'
import user from '@/components/user/user'

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
      },
      {
        path: '/dataForm',
        name: 'dataForm',
        component: dataForm
      },
      {
        path: '/jurisdiction',
        name: 'jurisdiction',
        component: jurisdiction
      },
      {
        path: '/role',
        name: 'role',
        component: role
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: orderList
      },
      {
        path: '/user',
        name: 'user',
        component: user
      }]
    }
  ]
})
