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
    userInfo: {},
    flag: ''
  },
  mutations: {
    setUserInfo (state, info = {}) {
      state.userInfo = info
    },
    setFlag (state, flag = '') {
      setItem('flag', flag)
      state.flag = flag
    },
    setToken (state, token = '') {
      setItem('token', token)
      state.token = token
    }
  },
  actions: {
    addUser ({ commit, dispatch }, params) {
      return ajax(userApi.add, params).then(({ data }) => {
        // commit('setUserInfo', data.info)
        toast('添加用户成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
        return Promise.reject(e)
      })
    },
    modifyUser ({ commit, dispatch }, params) {
      return ajax(userApi.put, params).then(({ data }) => {
        // commit('setUserInfo', data.info)
        commit('setToken', data.token)
        toast('x修改用户成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
        return Promise.reject(e)
      })
    },
    login ({ commit, dispatch }, params) {
      return ajax(userApi.login, params).then(({ data }) => {
        commit('setUserInfo', data)
        commit('setToken', data.token)
        commit('setFlag', data.id)
        return data
      }).catch(e => {
        toast(e.msg || e.body.msg)
        return Promise.reject(e)
      })
    }
  }
})

export default store
