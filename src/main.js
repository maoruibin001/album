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

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.http.options.emulateHTTP = false

Vue.http.interceptors.push((request, next) => {
  if (window.localStorage.getItem('token')) {
    request.headers.set('authorization', 'Bearer ' + window.localStorage.getItem('token'))
  }
  next((response) => {
    if (response.status === 401) {
      store.commit('unset_user')
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
