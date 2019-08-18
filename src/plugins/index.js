
import Vue from 'vue'
import VueScroller from 'vue-scroller'
import { isPc } from '@/utils'
export function initPlugin () {
  if (isPc()) {
    Vue.component('scroller', {
      template: '<div><slot></slot></div>'
    })
    return
  }
  Vue.use(VueScroller)
}
