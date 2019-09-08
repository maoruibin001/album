<template>
    <div class="container">
        <Slider @chooseItem="chooseItem" :list="navList"></Slider>
        <scroller refreshText="刷新中..." :on-refresh="refresh" height="95%" class="scrollerbox" :on-infinite="loadmore">
            <WaterFall @loadmore="loadmore" @reflowed="reflowed" class="item-box">
                <waterfall-slot class="slot-item" v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
                    <div class="item" @click="toDetail(item)">
                        <img :src="item.mainImgList[0].thumbUrl" :ref="item.id" @load="getCurrentHeight(item)" style="width: 100%" alt />
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
    </div>
</template>

<script>
import WaterFall from '@/components/common/WaterFall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import Slider from '@/components/Slider'
import { getImageHeightByWidth } from '@/utils'
import store from 'store/admin'
// import ItemFactory from "@/components/common/js/item-factory";
// const items = []
// for (let i = 0; i < 11; i++) {
//   items.push({
//     id: i,
//     width: 130,
//     height: 140,
//     url: `static/test/${(i % 5) + 1}.jpg`,
//     desc: '新款产品质量监督局'
//   })
// }
export default {
  components: {
    WaterFall,
    WaterfallSlot,
    Slider
  },
  data () {
    return {
      id: this.$route.params.id,
      items: [],
      itemWidth: 0
    }
  },
  computed: {
    // productInfo () {
    //   return store.state.productInfo || {}
    // },
    navList () {
      const info = store.state.bseriesInfo || {}
      return info.children
    },
    list () {
      // const info = store.state.productInfo || {}
      return store.state.productList || []
    },
    isEnd () {
      return store.state.isEnd
    },
    pageNo () {
      return store.state.pageNo
    },
    pageSize () {
      return store.state.pageSize
    }
    // items () {
    //   return this.handlerList(this.list)
    // }
  },
  created () {
    store.dispatch('getBseries', {
      bId: this.id
    })
    store.dispatch('getProducts', {
      bId: this.id
    })
  },
  watch: {
    list (val) {
      this.items = this.handlerList(val)
    }
  },

  methods: {
    toDetail (item) {
      if (!item.id) return
      this.$router.push('/detail/' + item.id)
    },
    handlerList (list) {
      return list.map(e => {
        return {
          ...e,
          width: 130,
          height: 140
        }
      })
    },
    chooseItem (item) {
      if (item.name === '全部') {
        store.dispatch('getProducts', {
          bId: this.id
        })
      } else {
        store.commit('setPageNo', 1)
        // store.commit('setProductImgList', [item])
        store.dispatch('getProducts', {
          lId: item.lId
        })
      }

      // this.items =
      // const index1 = Math.floor(Math.random() * (items.length - 1))
      // const index2 = Math.floor(Math.random() * (items.length - 1))
      // this.items = this.items.slice(Math.min(index1, index2), Math.max(index1, index2))
    },
    getCurrentHeight (item) {
      item.mainImgList = item.mainImgList || [{}]
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
      }, 2500)
    },
    loadmore (done) {
      done()
      // store.commit('setPageNo', this.pageNo + 1)
    }
  }
}
</script>

<style scoped>
.container {
    margin-top: 72px;
}
.scrollerbox {
  top: 72px !important;
}

.item-box {
    margin-left: -8px;
    /* top: 72px; */
    /* padding-top: 72px; */
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
