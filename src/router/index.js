import Vue from 'vue'
import Router from 'vue-router'
import loginRouter from '@/components/login'
import mainRouter from '@/components/main'
import shoppingList from '@/components/commodity/list'
import classification from '@/components/commodity/classification'
import parameter from '@/components/commodity/parameter'
import listadd from '@/components/commodity/listadd'
import dataForm from '@/components/data/reportForm'
import jurisdiction from '@/components/jurisdiction/jurisdiction'
import role from '@/components/jurisdiction/role'
import orderList from '@/components/order/orderList'
import user from '@/components/user/user'
import mianbao from '@/components/mianbao'
import {
  Message
} from 'element-ui'

Vue.use(Router)

Vue.component(mianbao.name, mianbao)

const router = new Router({
  routes: [{
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
          path: '/goods',
          name: 'shoplist',
          component: shoppingList
        },
        {
          path: '/categories',
          name: 'classification',
          component: classification
        },
        {
          path: '/params',
          name: 'parameter',
          component: parameter
        },
        {
          path: '/dataForm',
          name: 'dataForm',
          component: dataForm
        },
        {
          path: '/listadd',
          name: 'listadd',
          component: listadd
        },
        {
          path: '/roles',
          name: 'jurisdiction',
          component: jurisdiction
        },
        {
          path: '/rights',
          name: 'role',
          component: role
        },
        {
          path: '/orders',
          name: 'orderList',
          component: orderList
        },
        {
          path: '/users',
          name: 'user',
          component: user
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({
        name: 'login'
      })
      Message.error('请先登录')
      return
    }
  }
  next()
})
export default router
