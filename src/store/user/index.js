// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
import Vuex from 'vuex'
import Vue from 'vue'
import { ajax } from '@/utils/ajax'
import { userApi } from '@/utils/cgiConfig'
import { toast, setItem } from '../../utils'
// import config from '@/utils/config'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      name: 'maoruibin'
    }
  },
  mutations: {
    setUserInfo (state, info = {}) {
      setItem('token', info.token)
      state.userInfo = info
    }
  },
  actions: {
    addUser ({ commit, dispatch }, params) {
      return ajax(userApi.add, params).then(({ data }) => {
        // commit('setUserInfo', data.info)
      }).catch(e => {
        toast(e.msg || e.body.msg)
        return Promise.reject(e)
      })
    },
    login ({ commit, dispatch }, params) {
      return ajax(userApi.login, params).then(({ data }) => {
        commit('setUserInfo', data)
        setItem('flag', data.id)
        return data
      }).catch(e => {
        toast(e.msg || e.body.msg)
        return Promise.reject(e)
      })
    }
  }
})

export default store
