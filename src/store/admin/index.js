// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
import Vuex from 'vuex'
import Vue from 'vue'
import { ajax } from '@/utils/ajax'
import { productApi, bSeriesApi, lSeriesApi, accountApi } from '@/utils/cgiConfig'
import { toast, setItem, removeItem } from '@/utils'
import config from '@/utils/config'

// import axios from 'axios'
Vue.use(Vuex)

function preRequest (params) {
  const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params || {}

  return { ...params, pageNo, pageSize }
}

function afterResponse (commit, data, params) {
  const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params || {}
  commit('setIsEnd', !!data.isEnd)
  commit('setPageNo', pageNo)
  commit('setPageSize', pageSize)
  commit('setIsLoading', false)
}
const store = new Vuex.Store({
  state: {
    userInfo: {},
    flag: '',
    pageNo: 1,
    pageSize: config.PAGESIZE,
    isEnd: false,
    isLoading: false,
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
    setFlag (state, flag = '') {
      state.flag = flag
    },
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
    addProductList (state, list = []) {
      if (list.length === 0) return
      state.productList = state.productList.concat(list)
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
    },
    setPageNo (state, pageNo = 1) {
      state.pageNo = pageNo
    },
    setPageSize (state, pageSize = 10) {
      state.pageSize = pageSize
    },
    setIsEnd (state, isEnd = false) {
      state.isEnd = isEnd
    },
    setIsLoading (state, isLoading = false) {
      state.isLoading = isLoading
    },
    setUserInfo (state, info = {}) {
      state.userInfo = info
    }
  },
  actions: {
    wxLogin () {
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?
                  appid=${config.APPID}&
                  redirect_uri=${encodeURIComponent(location.href)}&
                  response_type=code&
                  scope=snsapi_userinfo#wechat_redirect`
      location.href = url
    },
    getUserInfo ({ commit, dispatch }, params) {
      const { code, uid } = params
      const _sendParams = {}
      if (code) {
        _sendParams.code = code
        // _sendParams.appId = config.APPID,
        // _sendParams.
      } else if (uid) {
        _sendParams.uid = uid
      }
      return ajax(accountApi.getUserInfo, params).then(ret => {
        commit('setUserInfo', ret)
        setItem('uid', ret.uid)
        toast('删除产品成功')
      }).catch(e => {
        // 用户已存在
        if (e.code === 11001) {
          removeItem('uid')
          dispatch('wxLogin')
        }
        toast(e.msg || e.body.msg)
      })
    },
    // getAccessToken () {
    //   return axios.get(wxApi.getAccessToken.method, {
    //     params: {
    //       grant_type: config.GRANTTYPE,
    //       appid: config.APPID,
    //       secret: config.SECRET
    //     }
    //   }).then(ret => {
    //     debugger
    //     toast('删除产品成功')
    //   }).catch(e => {
    //     toast(e.msg || e.body.msg)
    //   })
    // },
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
    getSomeProducts ({ commit, dispatch }, params) {
      // const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params
      return ajax(productApi.getSome, params).then(({ data }) => {
        // commit('setProductList', data.products)
        commit(params.pageNo === 1 ? 'setProductList' : 'addProductList', data.products)
        afterResponse(commit, data, params)
        // commit('setIsEnd', !!data.isEnd)
        // commit('setPageNo', pageNo)
        // commit('setPageSize', pageSize)
      }).catch(e => {
        commit('setIsLoading', false)
        toast(e.msg || e.body.msg)
      })
    },
    getProducts ({ commit, dispatch }, params) {
      params = preRequest(params)
      return ajax(productApi.getAll, params).then(({ data }) => {
        afterResponse(commit, data, params)
        commit(params.pageNo === 1 ? 'setProductList' : 'addProductList', data.products)
        return data
      }).catch(e => {
        commit('setIsLoading', false)
        toast(e.msg || e.body.msg)
      })
    },
    getProduct ({ commit, dispatch }, params) {
      // const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params
      return ajax(productApi.get, params).then(({ data }) => {
        commit('setProductInfo', data)
        afterResponse(commit, data, params)
        return data
      }).catch(e => {
        commit('setIsLoading', false)
        toast(e.msg || e.body.msg)
      })
    },

    deleteBseries ({ commit, dispatch }, params) {
      return ajax(bSeriesApi.delete, params).then(ret => {
        dispatch('getBserieses')
        dispatch('getProducts')
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
      // const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params
      return ajax(bSeriesApi.getAll, params).then(({ data }) => {
        commit('setBseriesList', data.bseries)
        afterResponse(commit, data, params)
        // commit('setIsEnd', !!data.isEnd)
        // commit('setPageNo', pageNo)
        // commit('setPageSize', pageSize)
      }).catch(e => {
        commit('setIsLoading', false)
        toast(e.msg || e.body.msg)
      })
    },
    getSomeBserieses ({ commit, dispatch }, params) {
      // const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params
      return ajax(bSeriesApi.getSome, params).then(({ data }) => {
        commit('setBseriesList', data.bseries)
        afterResponse(commit, data, params)
        // commit('setIsEnd', !!data.isEnd)
        // commit('setPageNo', pageNo)
        // commit('setPageSize', pageSize)
      }).catch(e => {
        commit('setIsLoading', false)
        toast(e.msg || e.body.msg)
      })
    },
    getBseries ({ commit, dispatch }, params) {
      // const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params
      return ajax(bSeriesApi.get, params).then(({ data }) => {
        commit('setBseriesInfo', data)
        afterResponse(commit, data, params)
        return data
        // commit('setIsEnd', !!data.isEnd)
        // commit('setPageNo', pageNo)
        // commit('setPageSize', pageSize)
      }).catch(e => {
        commit('setIsLoading', false)
        toast(e.msg || e.body.msg)
      })
    },

    deleteLseries ({ commit, dispatch }, params) {
      return ajax(lSeriesApi.delete, params).then(ret => {
        dispatch('getBserieses')
        dispatch('getProducts', params)
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
      // const { pageNo = config.PAGENO, pageSize = config.PAGESIZE } = params
      return ajax(lSeriesApi.getAll, params).then(({ data }) => {
        commit('setLseriesList', data.lseries)
        afterResponse(commit, data, params)
      }).catch(e => {
        commit('setIsLoading', false)
        toast(e.msg || e.body.msg)
      })
    },
    // getSomeLserieses () {},
    getLseries ({ commit, dispatch }, params) {
      return ajax(lSeriesApi.get, params).then(({ data }) => {
        commit('setLseriesInfo', data)
        afterResponse(commit, data, params)
      }).catch(e => {
        commit('setIsLoading', false)
        toast(e.msg || e.body.msg)
      })
    }
  }
})

export default store
