<template>
  <WaterFall @loadmore="loadmore" @reflowed="reflowed" class="item-box">
    <waterfall-slot
      class="slot-item"
      v-for="(item, index) in items"
      :width="item.width"
      :height="item.height"
      :order="index"
      :key="item.index"
      move-class="item-move"
    >
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
</template>

<script>
import WaterFall from '@/components/common/WaterFall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
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
    WaterfallSlot
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
      var img = new Image()
      img.src = item.url
      if (img.width > 0 || img.height > 0) {
        item.height = (item.width - 12) * (img.height / img.width) + 48
        return
      }
      const timer = setInterval(() => {
        if (img.width > 0 || img.height > 0) {
          item.height = (item.width - 12) * (img.height / img.width) + 48
          clearInterval(timer)
        }
      }, 30)
    },
    reflowed () {
      // this.itemWidth = $(".slot-item").width();
    },
    loadmore () {
      this.items.push.apply(
        this.items,
        items.map(e => {
          return Object.assign(e, {
            id: e.id + 100
          })
        })
      )
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
