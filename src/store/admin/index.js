// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const productList = [
  {
    id: 1,
    name: '产品大系列11你好，名字很长',
    children: [
      {
        id: 101,
        name: '产品小系列'
      },
      {
        id: 102,
        name: '产品小系列2'
      }
    ]
  },
  {
    id: 2,
    name: '产品大系列2',
    children: [
      {
        id: 201,
        name: '产品小系列1'
      },
      {
        id: 202,
        name: '产品小系列2'
      }
    ]
  }
]

const store = new Vuex.Store({
  state: {
    productList: productList
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default store
