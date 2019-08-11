<template>
  <waterfall
    @scroll.native="scrollfall"
    :align="align"
    :line-gap="200"
    :min-line-gap="100"
    :max-line-gap="220"
    :single-max-width="300"
    :watch="items"
    @reflowed="reflowed"
    ref="waterfall"
  >
    <slot></slot>
  </waterfall>
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
// import Carousel from "../Carousel";
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Waterfall
  },
  mounted () {
    window.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy () {
    window.addEventListener('scroll', this.scrollHandler)
  },

  data: function () {
    return {
      align: 'center',
      isBusy: false
    }
  },
  methods: {
    scrollHandler () {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop + window.innerHeight >= document.body.clientHeight) {
        this.addItems()
      }
    },
    addItems: function () {
      if (!this.isBusy) {
        this.isBusy = true
        this.$emit('loadmore')
      }
    },
    // shuffle: function() {
    //   this.items.sort(function() {
    //     return Math.random() - 0.5;
    //   });
    // },
    reflowed: function () {
      this.isBusy = false
      this.$emit('reflowed')
    }
  }
}
</script>

<style scoped>
.item-move {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.item {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  font-size: 1.2em;
  color: rgb(0, 158, 107);
}
.item:after {
  content: attr(index);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.wf-transition {
  transition: opacity 0.3s ease;
  -webkit-transition: opacity 0.3s ease;
}
.wf-enter {
  opacity: 0;
}
</style>
