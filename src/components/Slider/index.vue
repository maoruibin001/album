<template>
<div class="slider-container">
    <ul class="slider-box">
      <li class="slider-item" @click="chooseItem(item, sliderList)" :class="{active: item.isActive}" v-for="(item, i) of sliderList" :key="i" :style="{backgroundColor: item.color}">{{item.name}}</li>
    </ul>
</div>

</template>

<script>
const COLORSET = ['#252B18', '#4A3901', '#40481F', '#8B7450', '#647C02']
// const list = []
// list.push({
//   id: 0,
//   title: '全部',
//   color: COLORSET[0],
//   isActive: true
// })
// for (let i = 1; i < 25; i++) {
//   list.push({
//     id: i,
//     title: '产品小系列' + i,
//     color: COLORSET[i] || COLORSET[i % (COLORSET.length)],
//     isActive: false
//   })
// }
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      sliderList: this.handlerList(this.list)
    }
  },
  watch: {
    list (val) {
      this.sliderList = this.handlerList(this.list)
    }
  },
  methods: {
    handlerList (list) {
      return [{
        lId: 0,
        name: '全部',
        color: COLORSET[0],
        isActive: true
      }
      ].concat(list.map((e, i) => {
        return {
          ...e,
          color: COLORSET[i] || COLORSET[i % (COLORSET.length)],
          isActive: false
        }
      }))
    },
    chooseItem (item, list) {
      list.forEach(e => {
        e.isActive = (e.lId === item.lId)
      })
      this.$emit('chooseItem', item)
    }
  }
}
</script>
<style scoped>
.slider-container {
  width: 100%;
  height: 38px;
  /* background-color: #fff; */
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

.active {
  background-color: orange !important;
}
</style>
