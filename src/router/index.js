import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home'
import classify from '@/views/classify'
import littleClass from '@/views/classify/littleClass'
import collect from '@/views/collect'
import notice from '@/views/notice'
import user from '@/views/user'
import detail from '@/views/detail'
import detailGif from '@/views/detailGif'

import adminNav from '@/views/administer/nav'

import adminLogin from '@/views/administer/login'
import product from '@/views/administer/product'
import account from '@/views/administer/account'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/classify',
    name: 'classify',
    component: classify
  },
  {
    path: '/collect',
    name: 'collect',
    component: collect
  },
  {
    path: '/notice',
    name: 'notice',
    component: notice
  },
  {
    path: '/user',
    name: 'user',
    component: user
  },
  {
    path: '/:id/littleClass',
    name: 'littleClass',
    component: littleClass
  },

  {
    path: '/detail/:id',
    name: 'detail',
    component: detail
  },

  {
    path: '/detail/:id/gif',
    name: 'detailGif',
    component: detailGif
  },
  {
    path: '/admin',
    name: 'admin',
    component: adminNav,
    redirect: '/admin/0',
    children: [
      {
        path: '/admin/:id',
        name: 'product',
        component: product
      }
    ]
  },
  {
    path: '/login',
    name: 'adminLogin',
    component: adminLogin
  },
  {
    path: '/account',
    name: 'account',
    component: account
  }
  ]
})
