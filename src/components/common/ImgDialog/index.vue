<template>
  <div class="img-diolog">
    <div class="close" @click="close" v-if="needClose">X</div>
    <img :src="url" alt="" class="w-100">
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    needClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.img-diolog {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10000;
}
.close {
  position: absolute;
  top: 20px;
  right: 20px;
}
.w-100 {
  width: 100%;
}
</style>
