<template>
    <div class="container">
        <Slider @chooseItem="chooseItem"></Slider>
        <scroller refreshText="刷新中..." :on-refresh="refresh" height="95%" class="scrollerbox" :on-infinite="loadmore">
            <WaterFall @reflowed="reflowed" class="item-box">
                <waterfall-slot class="slot-item" v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
                    <div class="item">
                        <img :src="item.url" :ref="item.id" @load="getCurrentHeight(item)" style="width: 100%" alt />
                        <div class="item-desc">
                            <div class="left">
                                {{item.desc}}
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
// import ItemFactory from "@/components/common/js/item-factory";
const items = []
for (let i = 0; i < 11; i++) {
  items.push({
    id: i,
    width: 130,
    height: 140,
    url: `static/test/${(i % 5) + 1}.jpg`,
    desc: '新款产品质量监督局'
  })
}
export default {
  components: {
    WaterFall,
    WaterfallSlot,
    Slider
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
    chooseItem (item) {
      const index1 = Math.floor(Math.random() * (items.length - 1))
      const index2 = Math.floor(Math.random() * (items.length - 1))
      this.items = items.slice(Math.min(index1, index2), Math.max(index1, index2))
    },
    getCurrentHeight (item) {
      getImageHeightByWidth(item.url, item.width).then(height => {
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
      setTimeout(() => {
        this.items.push.apply(
          this.items,
          items.map(e => {
            return Object.assign(e, {
              id: e.id + 100
            })
          })
        )
        done()
      }, 1500)
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
