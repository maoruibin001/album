// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { initPlugin } from './plugins'
import './module'
import './filters'
import store from 'store/admin'
import { getItem, getUrlParams } from '@/utils'
Vue.config.productionTip = false

Vue.use(VueResource)

Vue.http.options.emulateHTTP = false

const code = getUrlParams('code')
const uid = getItem('uid')
if (!uid && !code) {
  store.dispath('wxLogin')
} else if (code) {
  store.dispatch('getUserInfo', { code })
} else {
  store.dispatch('getUserInfo', { uid })
}

Vue.http.interceptors.push((request, next) => {
  let authString = 'Bearer'
  const token = getItem('token') || getUrlParams('token')
  const flag = getItem('flag') || getUrlParams('flag')
  authString = token ? authString + ' ' + token : authString + ' '
  authString = flag ? authString + ' ' + flag : authString + ' '
  request.headers.set('authorization', authString)
  console.log(authString)
  next((response) => {
    if (response.status === 401) {
      store.commit('setUserInfo', {})
      store.commit('setFlag', '')
      router.go({
        name: 'login'
      })
    }
    if (response.status === 200) {
      return Object.assign({}, response.body, {
        ok: true
      })
    }

    return response
  })
})
initPlugin()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
