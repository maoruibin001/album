// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
import Vuex from 'vuex'
import Vue from 'vue'
import { ajax } from '@/utils/ajax'
import { productApi, bSeriesApi, lSeriesApi } from '@/utils/cgiConfig'
import { toast } from '@/utils'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    bseriesList: [],
    bseriesInfo: {},
    lseriesList: [],
    lseriesInfo: {},
    productList: [],
    productInfo: {},

    editDiologShow: false,
    bEditDiologShow: false,
    lEditDiologShow: false,

    isEdit: false,
    isBEdit: false,
    isLEdit: false,
    editInfo: {
      name: '',
      mainImgList: [],
      descImgThumb: '',
      descImg: '',
      gifImgThumb: '',
      gifImg: '',
      originFile: '',
      prize: 0
    },
    bEditInfo: {
      name: ''
    },
    lEditInfo: {
      name: '',
      mainImg: '',
      mainImgThumb: '',
      bId: 0
    }
  },
  mutations: {
    setEditing (state, isEdit = false) {
      state.isEdit = isEdit
    },
    setBEditing (state, isEdit = false) {
      state.isBEdit = isEdit
    },
    setLEditing (state, isEdit = false) {
      state.isLEdit = isEdit
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
    setBEditInfo (state, info = {}) {
      state.bEditInfo = info
    },
    setLEditInfo (state, info = {}) {
      state.lEditInfo = info
    },
    setEditDiologShow (state, show = false) {
      state.editDiologShow = show
    },
    setBEditDiologShow (state, show = false) {
      state.bEditDiologShow = show
    },
    setLEditDiologShow (state, show = false) {
      state.lEditDiologShow = show
    },

    setBseriesList (state, list = []) {
      state.bseriesList = list
    },
    setLseriesList (state, list = []) {
      state.lseriesList = list
    },
    setBseriesInfo (state, info = {}) {
      state.bseriesInfo = info
    },
    setLseriesInfo (state, info = {}) {
      state.lseriesInfo = info
    }
    // setEditInfo (state, info = {}) {
    //   state.editInfo = info
    // },
    // setEditDiologShow (state, show = false) {
    //   state.editDiologShow = show
    // }
  },
  actions: {
    deleteProduct ({ commit, dispatch }, params) {
      return ajax(productApi.delete, params).then(ret => {
        dispatch('getProducts', params)
        toast('删除产品成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    addProduct ({ commit, dispatch }, params) {
      return ajax(productApi.add, params).then(({ data }) => {
        dispatch('getProducts', data)
        toast('新增产品成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    moveProduct ({ commit, dispatch }, params) {
      return ajax(productApi.move, params).then(ret => {
        dispatch('getProducts', params)
        toast('移动产品成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    editProduct ({ commit, dispatch }, params) {
      return ajax(productApi.edit, params).then(({ data }) => {
        dispatch('getProducts', data)
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
    },

    deleteBseries ({ commit, dispatch }, params) {
      return ajax(bSeriesApi.delete, params).then(ret => {
        dispatch('getBserieses')
        toast('删除大类成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    addBseries ({ commit, dispatch }, params) {
      return ajax(bSeriesApi.add, params).then(ret => {
        dispatch('getBserieses')
        toast('新增大系列成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    moveBseries ({ commit, dispatch }, params) {
      return ajax(bSeriesApi.move, params).then(ret => {
        dispatch('getBserieses')
        toast('移动大系列成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    editBseries ({ commit, dispatch }, params) {
      return ajax(bSeriesApi.edit, params).then(ret => {
        dispatch('getBserieses')
        toast('修改大系列成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    getBserieses ({ commit, dispatch }, params) {
      return ajax(bSeriesApi.getAll, params).then(({ data }) => {
        commit('setBseriesList', data.bseries)
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    getBseries ({ commit, dispatch }, params) {
      return ajax(bSeriesApi.get, params).then(({ data }) => {
        commit('setBseriesInfo', data)
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },

    deleteLseries ({ commit, dispatch }, params) {
      return ajax(lSeriesApi.delete, params).then(ret => {
        dispatch('getBserieses')
        toast('删除小类成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    addLseries ({ commit, dispatch }, params) {
      return ajax(lSeriesApi.add, params).then(ret => {
        dispatch('getBserieses')
        toast('新增小系列成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    moveLseries ({ commit, dispatch }, params) {
      return ajax(lSeriesApi.move, params).then(ret => {
        dispatch('getBserieses')
        toast('移动小系列成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    editLseries ({ commit, dispatch }, params) {
      return ajax(lSeriesApi.edit, params).then(ret => {
        dispatch('getBserieses')
        toast('修改小系列成功')
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    getLserieses ({ commit, dispatch }, params) {
      return ajax(lSeriesApi.getAll, params).then(({ data }) => {
        commit('setLseriesList', data.lseries)
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    },
    getLseries ({ commit, dispatch }, params) {
      return ajax(lSeriesApi.get, params).then(({ data }) => {
        commit('setLseriesInfo', data)
      }).catch(e => {
        toast(e.msg || e.body.msg)
      })
    }
  }
})

export default store
