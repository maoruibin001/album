
import Vue from 'vue'
import VueScroller from 'vue-scroller'
import MescrollVue from 'mescroll.js/mescroll.vue'
import vueWaterfallEasy from 'vue-waterfall-easy'
import { isPc } from '@/utils'
import nodata from '@/components/common/NoData'
Vue.component('waterfall', vueWaterfallEasy)
Vue.component('nodata', nodata)

export function initPlugin () {
  if (isPc()) {
    Vue.component('scroller', {
      template: '<div><slot></slot></div>'
    })
    return
  }
  Vue.use(VueScroller)
  Vue.component('mescroll', MescrollVue)
}
