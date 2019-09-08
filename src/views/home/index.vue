<template>
    <scroller refreshText="刷新中..." :on-refresh="refresh" height="95%">
        <WaterFall @loadmore="loadmore" class="item-box">
            <waterfall-slot v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
                <div class="item" @click="toDetail(item)">
                    <Carousel :item="item.children || []" @itemChange="itemChange"></Carousel>
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
import store from 'store/admin'
export default {
  components: {
    WaterFall,
    WaterfallSlot,
    Carousel
  },
  created () {
    store.dispatch('getBserieses')
  },
  computed: {
    list () {
      const items = store.state.bseriesList.map(e => {
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
  data () {
    return {
      items: this.list
    }
  },
  methods: {
    itemChange (item) {
      this.items.forEach(e => {
        if (e.bId === item.bId) {
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
    /* height: 110%; */
}

.item {
    position: absolute;
    top: 0;
    left: 12px;
    right: 0;
    bottom: 22px;
    /* height: 90% */
}

.item-desc {
    display: flex;
    /* position: absolute;
    bottom: 0; */
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
