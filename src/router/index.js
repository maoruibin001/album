import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home'
import classify from '@/views/classify'
import littleClass from '@/views/classify/littleClass'
import collect from '@/views/collect'
import notice from '@/views/notice'
import user from '@/views/user'
import detail from '@/views/detail'
// import upload from '@/components/common/Cropper/cropper-list'
import adminNav from '@/views/administer/nav'
// import adminBigClass from '@/views/administer/bigClass'
// import adminlittleClass from '@/views/administer/littleClass'
import product from '@/views/administer/product'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
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
    path: '/littleClass',
    name: 'littleClass',
    component: littleClass
  },

  {
    path: '/detail',
    name: 'detail',
    component: detail
  },
  {
    path: '/admin',
    name: 'admin',
    component: adminNav,
    children: [
      {
        path: '/admin/:id',
        name: 'product',
        component: product
      }
      // {
      //   path: '/admin/:id/:seriId',
      //   name: 'littleClass',
      //   component: adminlittleClass
      // }
    ]
  }
  ]
})
