<template>
    <scroller ref="scroller" refreshText="刷新中..." :on-refresh="refresh" :on-infinite="loadmore" height="95%">
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
                        <div class="right" @click="item.showPannel=!item.showPannel">
                          <LittlePannel :isShow="item.showPannel" @tabCollection="tabCollection" :id="item.id" :isCollection="item.isCollection"></LittlePannel>
                          <!-- <img src="../../assets/icon-collect.png" alt=""> -->
                            ...&nbsp;
                        </div>
                    </div>
                </waterfall-slot>
            </WaterFall>
        </div>
         <nodata v-if="isEnd"></nodata>
    </scroller>
</template>

<script>
import WaterFall from '@/components/common/WaterFall'
import LittlePannel from '@/components/common/littlePannel'
import Carousel from '@/components/common/Carousel'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import store from 'store/admin'
import { wait } from '@/utils'
export default {
  components: {
    WaterFall,
    WaterfallSlot,
    Carousel,
    LittlePannel
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
          height: 140,
          showPannel: false
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
      showPannel: false,
      items: this.list
    }
  },
  methods: {
    tabCollection (id) {
      const item = this.list.find(e => e.id === id)
      store.dispatch('collect', item).then(() => {
        item.isCollection = item.isCollection === 1 ? 0 : 1
      })
    },
    itemChange (item) {
      this.items.forEach(e => {
        if (e.id === item.id) {
          e.height = item.height
        }
      })
    },
    toDetail (item) {
      if (!item.id) return
      this.$router.push('/detail/' + item.id)
    },
    refresh (done) {
      wait(store.dispatch('getProducts')).then(() => {
        done()
      }).catch(e => {
        done()
      })
    },
    loadmore (done) {
      if (this.isEnd) {
        this.$refs.scroller.finishInfinite()
        return
      }
      if (this.isLoading) {
        return
      }
      store.commit('setIsLoading', true)
      wait(store.dispatch('getProducts', {
        pageNo: this.pageNo + 1
      })).then(() => {
        done()
      }).catch(e => {
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
    position: relative
}
</style>
