<template>
  <div class="nodata">
   {{title}}
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '没有更多数据'
    }
  }
}
</script>
<style scoped>
.nodata {
  color: #7E7E7E;
  font-size:12px
}
 </style>>
