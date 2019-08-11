<template>
  <WaterFall @loadmore="loadmore" @reflowed="reflowed">
    <waterfall-slot
      class="slot-item"
      v-for="(item, index) in items"
      :width="item.width"
      :height="item.height"
      :order="index"
      :key="item.index"
      move-class="item-move"
    >
      <img :src="item.url" :ref="item.id" @load="getCurrentHeight(item)" style="width: 100%" alt />
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
    url: `static/test/${(i % 5) + 1}.jpg`
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
        item.height = item.width * (img.height / img.width)
        return
      }
      const timer = setInterval(() => {
        if (img.width > 0 || img.height > 0) {
          item.height = item.width * (img.height / img.width)
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
</style>
