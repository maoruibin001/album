// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
import Vuex from 'vuex'
import Vue from 'vue'
import { ajax } from '@/utils/ajax'
import { productApi } from '@/utils/cgiConfig'
import { toast } from '../../utils'
import config from '@/utils/config'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    productList: [],
    productInfo: {},
    editDiologShow: false,
    isEdit: false,
    isEnd: false,
    pageNo: config.PAGENO,
    pageSize: config.PAGESIZE,
    productImgList: [],
    editInfo: {
      name: '',
      mainImgList: [],
      descImgThumb: '',
      descImg: '',
      // gifImgThumb: '',
      gifImg: '',
      originFile: '',
      prize: 0

    }
  },
  mutations: {
    // setEditing (state, isEdit = false) {
    //   state.isEdit = isEdit
    // },
    setProductList (state, list = []) {
      state.productList = list
    },
    addProductList (state, list = []) {
      state.productList = state.productList.concat(list)
    },
    setIsEnd (state, isEnd = false) {
      state.isEdit = isEnd
    },
    setPageNo (state, pageNo = 1) {
      state.pageNo = pageNo
    },
    setPageSize (state, pageSize = 10) {
      state.pageSize = pageSize
    },
    setProductInfo (state, info = {}) {
      state.productInfo = info
    },
    setProductImgList (state, list = []) {
      state.productImgList = list
    }
    // setEditInfo (state, info = {}) {
    //   state.editInfo = info
    // },
    // setEditDiologShow (state, show = false) {
    //   state.editDiologShow = show
    // }
  },
  actions: {
    // deleteProduct ({ commit, dispatch }, params) {
    //   return ajax(productApi.delete, params).then(ret => {
    //     dispatch('getProducts')
    //     toast('删除产品成功')
    //   }).catch(e => {
    //     toast(e.msg || e.body.msg)
    //   })
    // },
    // addProduct ({ commit, dispatch }, params) {
    //   return ajax(productApi.add, params).then(ret => {
    //     dispatch('getProducts')
    //     toast('新增产品成功')
    //   }).catch(e => {
    //     toast(e.msg || e.body.msg)
    //   })
    // },
    // editProduct ({ commit, dispatch }, params) {
    //   return ajax(productApi.edit, params).then(ret => {
    //     dispatch('getProducts')
    //     toast('修改产品成功')
    //   }).catch(e => {
    //     toast(e.msg || e.body.msg)
    //   })
    // },
    getProducts ({ commit, dispatch }, params) {
      const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params
      return ajax(productApi.getAll, { ...params, pageNo, pageSize }).then(({ data }) => {
        commit(pageNo === 1 ? 'setProductList' : 'addProductList', data.products)
        commit('setIsEnd', !!data.isEnd)
        commit('setPageNo', pageNo)
        commit('setPageSize', pageSize)
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    getProduct ({ commit, dispatch }, params) {
      // const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params
      return ajax(productApi.get, params).then(({ data }) => {
        commit('setProductInfo', data)
        commit('setProductImgList', data.children)
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    }
  }
})

export default store
