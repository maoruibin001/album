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
      <img :id="'pic' + e.lId" @load="getImgSize(e, i)" style="border-radus: 5px;" :style="e.style" :src="e.mainImgThumb" alt />
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import { getImageHeightByWidth } from '@/utils'
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
      maxHeight: 0,
      maxHeightItem: {},
      items: this.item.map(e => {
        return {
          ...e,
          style: {
            width: '100%',
            height: 'auto'
          }
        }
      }),
      index: this.item.length
    }
  },
  methods: {
    reHeight () {
      // this.items.forEach(e => {
      //   e.style.height = (this.maxHeight / e.height / ) * 100 + '%'
      // })
    },
    getImgSize (item, i) {
      getImageHeightByWidth(item.mainImgThumb, 130, 0, 10).then(height => {
        item.height = height
        const isMoreBig = height > this.maxHeight
        this.maxHeight = isMoreBig ? height : this.maxHeight
        this.maxHeightItem = isMoreBig ? item : this.maxHeightItem
        this.index--
        if (this.index === 0) {
          console.log('maxHeight: ', this.maxHeight, this.maxHeightItem)
          this.$emit('itemChange', this.maxHeightItem)
          this.reHeight()

          // item.style.height = '376px'
        }
        // if (height > 130) {
        //   item.style.width = 'auto'
        //   item.style.height = '100%'
        // } else {
        //   item.style.width = '100%'
        //   item.style.height = 'auto'
        // }
        // if (height > 130)
        // if (i === 0) {
        //   this.$emit('itemChange', item)
        //   // console.log('item is: ', item)
        // } else {

        // }
      })
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
