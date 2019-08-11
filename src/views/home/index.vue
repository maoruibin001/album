<template>
  <WaterFall @loadmore="loadmore">
    <waterfall-slot
      v-for="(item, index) in items"
      :width="item.width"
      :height="item.height"
      :order="index"
      :key="item.index"
      move-class="item-move"
    >
      <Carousel :item="item"></Carousel>
    </waterfall-slot>
  </WaterFall>
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
    loadmore () {
      this.items.push.apply(this.items, ItemFactory.get(30))
    }
  }
}
</script>
<style scoped>
</style>
