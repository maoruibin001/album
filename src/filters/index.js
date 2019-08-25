import Vue from 'vue'

import { ellipsis } from '@/utils'

const filters = [{ ellipsis }]

for (const e of filters) {
  for (const key in e) {
    if (typeof e[key] !== 'function') break
    Vue.filter(key, e[key])
  }
}
