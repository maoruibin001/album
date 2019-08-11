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
    <slide v-for="(item, i) of items" :key="i">
      <img style="width: 100%;" :src="item.url" alt />
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
const items = []
for (let i = 1; i < 6; i++) {
  items.push({
    url: `static/test/${i}.jpg`
  })
}

export default {
  props: ['item', 'data'],
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      items: items
    }
  }
}
</script>
