<template>
    <scroller refreshText="刷新中..." :on-refresh="refresh" height="95%">
        <WaterFall @loadmore="loadmore" class="item-box">
            <waterfall-slot v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
                <div class="item" @click="toDetail(item)">
                    <Carousel :item="item.mainImgList || []"></Carousel>
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
    </scroller>
</template>

<script>
import WaterFall from '@/components/common/WaterFall'
import Carousel from '@/components/common/Carousel'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
// import ItemFactory from '@/components/common/js/item-factory'
import store from 'store/front'
export default {
  components: {
    WaterFall,
    WaterfallSlot,
    Carousel
  },
  created () {
    store.dispatch('getProducts', {
      pId: -1
    })
  },
  computed: {
    items () {
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
    }
  },
  data () {
    return {
      // items: ItemFactory.get(20)
    }
  },
  methods: {
    toDetail (item) {
      if (!item.id) return
      this.$router.push('/detail/' + item.id)
    },
    refresh (done) {
      store.dispatch('getProducts', {
        pId: -1
      }).then(() => {
        done()
      }).catch(() => {
        done()
      })
    },
    loadmore (done) {
    // done()
      if (this.isEnd) {
        return
      }
      store.dispatch('getProducts', {
        pageNo: this.pageNo + 1,
        pId: -1
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
