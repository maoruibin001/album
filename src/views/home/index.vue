<template>
    <scroller refreshText="刷新中..." :on-refresh="refresh" height="95%" :on-infinite="loadmore">
        <WaterFall @loadmore="loadmore" class="item-box">
            <waterfall-slot v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
                <div class="item">
                    <Carousel :item="item"></Carousel>
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
</template>

<script>
import WaterFall from '@/components/common/WaterFall'
import Carousel from '@/components/common/Carousel'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import ItemFactory from '@/components/common/js/item-factory'
export default {
  components: {
    WaterFall,
    WaterfallSlot,
    Carousel
  },
  data () {
    return {
      items: ItemFactory.get(20)
    }
  },
  methods: {
    refresh (done) {
      setTimeout(() => {
        done()
      }, 1500)
    },
    loadmore (done) {
      this.items.push.apply(this.items, ItemFactory.get(30))
      done()
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
