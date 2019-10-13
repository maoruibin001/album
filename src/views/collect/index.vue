<template>
    <scroller refreshText="刷新中..." :on-refresh="refresh" height="95%" :on-infinite="loadmore">
        <WaterFall @loadmore="loadmore" @reflowed="reflowed" class="item-box">
            <waterfall-slot class="slot-item" v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
                <div class="item" @click="toDetail(item)">
                    <img :src="item.mainImgList[0].url" :ref="item.id" @load="getCurrentHeight(item)" style="width: 100%" alt />
                    <div class="item-desc">
                        <div class="left">
                            {{item.name}}
                        </div>
                        <div class="right">
                            ...&nbsp;
                        </div>
                    </div>
                </div>
            </waterfall-slot>
        </WaterFall>
        <nodata v-if="isEnd"></nodata>
    </scroller>
</template>

<script>
import WaterFall from '@/components/common/WaterFall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import { getImageHeightByWidth } from '@/utils'
import store from 'store/admin'
export default {
  components: {
    WaterFall,
    WaterfallSlot
  },
  data () {
    return {
      items: []
    }
  },
  computed: {
    list () {
      const items = store.state.colections.map(e => {
        return {
          ...e,
          width: 130,
          height: 140
        }
      })
      return items
    },
    isEnd () {
      return store.state.isEnd
    },
    pageNo () {
      return store.state.pageNo
    }
  },
  watch: {
    list (val) {
      this.items = val
    }
  },
  created () {
    store.dispatch('getCollects')
  },
  methods: {
    toDetail (item) {
      if (!item.id) return
      this.$router.push('/detail/' + item.id)
    },
    getCurrentHeight (item) {
      getImageHeightByWidth((item.mainImgList[0] || {}).url, item.width).then(height => {
        item.height = height
      })
    },
    reflowed () {
      // this.itemWidth = $(".slot-item").width();
    },
    refresh (done) {
      setTimeout(() => {
        done()
      }, 1500)
    },
    loadmore (done) {
      done()
      if (typeof done !== 'function') {
        done = function () {}
      }
    }
  }
}
</script>

<style scoped>
.item-box {
    margin-left: -8px;
}

.item {
    position: absolute;
    top: 0;
    left: 12px;
    right: 0;
    bottom: 22px;
}

.item-desc {
    display: flex;
}

.left {
    flex: 5;
    font-size: 12px;
    text-align: left;
}

.right {
    flex: 1;
    text-align: right;
    color: #4A4747;
    font-size: 24px;
    font-weight: bolder;
    line-height: 8px;
}
</style>
