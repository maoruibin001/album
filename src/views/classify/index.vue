<template>
    <scroller refreshText="刷新中..." :on-refresh="refresh" height="95%" :on-infinite="loadmore">
        <WaterFall class="box" @reflowed="reflowed">
            <waterfall-slot class="slot-item" v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
                <div class="item" @click="toLittleClass(item)">
                    <div class="title">产品大系列</div>
                    <img :src="item.url" :ref="item.id" @load="getCurrentHeight(item)" style="width: 100%" alt />
                </div>

            </waterfall-slot>
        </WaterFall>
    </scroller>
</template>

<script>
import WaterFall from '@/components/common/WaterFall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import { getImageHeightByWidth } from '@/utils'
// import PullTo from 'vue-pull-to'
// import ItemFactory from "@/components/common/js/item-factory";
const items = []
for (let i = 0; i < 11; i++) {
  items.push({
    id: i,
    width: 130,
    height: 140,
    url: `static/test/${(i % 5) + 1}.jpg`
  })
}
export default {
  components: {
    WaterFall,
    WaterfallSlot
    // PullTo
  },
  data () {
    return {
      items: items.map(e => ({ ...e })),
      itemWidth: 0
    }
  },
  mounted () {
    this.$nextTick(() => {})
  },
  methods: {
    getCurrentHeight (item) {
      getImageHeightByWidth(item.url, item.width).then(height => {
        item.height = height
      })
    },
    toLittleClass (item) {
      this.$router.push('/littleClass')
    },
    reflowed () {
      // this.itemWidth = $(".slot-item").width();
    },
    refresh (loaded) {
      setTimeout(() => {
        // this.dataList.reverse()
        loaded('done')
      }, 2000)
    },

    loadmore (loaded) {
      setTimeout(() => {
        // this.dataList = this.dataList.concat(this.dataList)
        loaded('done')
      }, 2000)
    },

    stateChange (state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom'
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading'
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish'
      }
    }
  }
  // loadmore () {
  //   this.items.push.apply(
  //     this.items,
  //     items.map(e => {
  //       return Object.assign(e, {
  //         id: e.id + 100
  //       })
  //     })
  //   )
  // }
  // }
}
</script>

<style scoped>
.box {
    margin-left: -8px;
}

.item {
    position: absolute;
    top: 0;
    left: 12px;
    right: 0;
    bottom: 12px;
    background-color: #ffff;
}

.title {
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-family: Regular;
    font-size: 12px;
    background-color: #F2F2F2;
}
</style>
