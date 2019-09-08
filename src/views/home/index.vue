<template>
    <scroller refreshText="刷新中..." :on-refresh="refresh" height="95%">
        <div style="padding: 0 10px;">
            <WaterFall @loadmore="loadmore" class="item-box">
                <waterfall-slot v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
                    <div class="item" @click="toDetail(item)" v-if="item.mainImgList && item.mainImgList.length > 0">
                        <Carousel :item="item.mainImgList || []" @itemChange="itemChange" :id="item.id"></Carousel>
                    </div>
                    <div class="item-desc">
                        <div class="left">
                            {{item.name}}
                        </div>
                        <div class="right">
                            ...&nbsp;
                        </div>
                    </div>
                </waterfall-slot>
            </WaterFall>
        </div>
    </scroller>
</template>

<script>
import WaterFall from '@/components/common/WaterFall'
import Carousel from '@/components/common/Carousel'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
// import ItemFactory from '@/components/common/js/item-factory'
import store from 'store/admin'
import { wait } from '@/utils'
export default {
  components: {
    WaterFall,
    WaterfallSlot,
    Carousel
  },
  created () {
    store.dispatch('getProducts')
  },
  computed: {
    list () {
      const items = store.state.productList.map(e => {
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
    },
    isLoading () {
      return store.state.isLoading
    }
  },
  watch: {
    list (val) {
      this.items = val
    }
  },
  data () {
    return {
      items: this.list
    }
  },
  methods: {
    itemChange (item) {
      this.items.forEach(e => {
        if (e.id === item.id) {
          e.height = item.height
        }
      })
      // debugger
    },
    toDetail (item) {
      if (!item.id) return
      this.$router.push('/detail/' + item.id)
    },
    refresh (done) {
      wait(store.dispatch('getBserieses')).then(() => {
        done()
      }).catch(e => {
        done()
      })
    },
    loadmore (done) {
      if (this.isEnd || this.isLoading) {
        done()
        return
      }
      store.commit('setIsLoading', true)
      store.dispatch('getProducts', {
        pageNo: this.pageNo + 1
      }).then(() => {
        done()
      }).catch(() => {
        done()
      })
    }
  }
}
</script>

<style scoped>
.item-box {
    margin-left: -8px;
    position: relative;
    height: 110%;
}

.item {
    position: absolute;
    top: 0;
    left: 12px;
    right: 0;
    bottom: 22px;
    overflow: hidden;
    /* height: 90% */
}

.item-desc {
    display: flex;
    position: absolute;
    width: 94%;
    bottom: 5px;
    left: 13px;
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
