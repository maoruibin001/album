
import Vue from 'vue'
import VueScroller from 'vue-scroller'
import MescrollVue from 'mescroll.js/mescroll.vue'

import waterfall from 'vue-waterfall2'
import { isPc } from '@/utils'
Vue.use(waterfall)
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
