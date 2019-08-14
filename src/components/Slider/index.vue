<template>
<div class="slider-container">
    <ul class="slider-box">
      <li class="slider-item" v-for="(item, i) of list" :key="i" :style="{backgroundColor: item.color}">{{item.title}}</li>
    </ul>
</div>

</template>

<script>
const COLORSET = ['#252B18', '#4A3901', '#40481F', '#8B7450', '#647C02']
const list = []
for (let i = 0; i < 25; i++) {
  list.push({
    id: i,
    title: '产品小系列' + i,
    color: COLORSET[i] || COLORSET[i % (COLORSET.length)]
  })
}
export default {
  data () {
    return {
      list: list
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
.slider-container {
  width: 100%;
  height: 38px;
  background-color: #fff;
  position:fixed;
  left: 13px;
  top: 34px;
  right: 0;
  z-index: 10;
  /* margin-left: 20px; */
}
.slider-box {
  height: 28px;
  /* width: 100%; */
  overflow: scroll;
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0; margin: 0;
}
.slider-item {
  /* float: left; */
  min-width: 80px;
  padding: 3px 12px;
  line-height: 24px;
  font-size: 14px;
  /* height: 24px; */
  font-size: 12px;
  overflow: hidden;
  border-radius: 5px;
  margin-right: 5px;
  color: #EDEDED;
}
</style>
