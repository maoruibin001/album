<template>
  <carousel
    :mouseDrag="false"
    :autoplay="true"
    :loop="true"
    :perPage="1"
    :autoplayTimeout="5000"
    :paginationEnabled="false"
    :adjustableHeight="true"
  >
    <!-- <slide>
      <img style="width: 100%;border-radus: 5px;" :src="items[0].thumbUrl" alt />
    </slide> -->
    <slide v-for="(e, i) of items" :key="i" :style="{zIndex: zIndex}">
      <img style="width: 100%;border-radus: 5px;" :src="e.thumbUrl" alt />
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
// const items = []
// for (let i = 1; i < 6; i++) {
//   items.push({
//     url: `static/test/${i}.jpg`
//   })
// }

export default {
  props: ['item', 'data'],
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      zIndex: 1,
      items: this.item
    }
  },
  mounted () {
    setTimeout(() => {
      this.zIndex = 2
    }, (300))
    setTimeout(() => {
      this.zIndex = 3
    }, (500))
    setTimeout(() => {
      this.zIndex = 4
    }, (1000))
  }
}
</script>
