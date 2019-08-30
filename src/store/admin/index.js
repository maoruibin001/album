// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
import Vuex from 'vuex'
import Vue from 'vue'
import { ajax } from '@/utils/ajax'
import { productApi } from '@/utils/cgiConfig'
import { toast } from '../../utils'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    productList: [],
    productInfo: {},
    editDiologShow: false,
    editInfo: {
      name: '',
      mainImgList: [],
      descImgThumb: '',
      descImg: '',
      // gifImgThumb: '',
      gifImg: '',
      originFile: '',
      prize: 0,
      isEdit: false
    }
  },
  mutations: {
    setEditing (state, isEdit = false) {
      state.isEdit = isEdit
    },
    setProductList (state, list = []) {
      state.productList = list
    },
    setProductInfo (state, info = {}) {
      state.productInfo = info
    },
    setEditInfo (state, info = {}) {
      state.editInfo = info
    },
    setEditDiologShow (state, show = false) {
      state.editDiologShow = show
    }
  },
  actions: {
    deleteProduct ({ commit, dispatch }, params) {
      return ajax(productApi.delete, params).then(ret => {
        dispatch('getProducts')
        toast('删除产品成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    addProduct ({ commit, dispatch }, params) {
      return ajax(productApi.add, params).then(ret => {
        dispatch('getProducts')
        toast('新增产品成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    editProduct ({ commit, dispatch }, params) {
      return ajax(productApi.edit, params).then(ret => {
        dispatch('getProducts')
        toast('修改产品成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    getProducts ({ commit, dispatch }, params) {
      return ajax(productApi.getAll, params).then(({ data }) => {
        commit('setProductList', data.products)
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    getProduct ({ commit, dispatch }, params) {
      return ajax(productApi.get, params).then(({ data }) => {
        commit('setProductInfo', data)
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    }
  }
})

export default store
