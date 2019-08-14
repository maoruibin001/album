<template>
  <div class="notice-box">
    <div class="item" v-for="(item, i) in items" :key="i">
      <div class="title">
        <div class="icon iconfont" :class="item.icon"></div>
        <div class="text">{{item.title}}</div>
        <div class="date">{{item.createTime | getGapDay}}</div>
      </div>
      <div class="content">
         <img :src="item.url" :ref="item.id" style="width: 100%" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { getGapDay } from '@/utils/date'
const items = []
for (let i = 0; i < 11; i++) {
  items.push({
    id: i,
    title: '默认最新的一个',
    icon: 'iconzu3',
    url: `static/test/${(i % 5) + 1}.jpg`,
    createTime: Date.now() - (i) * 24 * 60 * 60 * 1000
  })
}
export default {
  components: {
  },
  data () {
    return {
      items: items.map(e => ({ ...e })),
      itemWidth: 0
    }
  },
  filters: {
    getGapDay
  },
  mounted () {
    this.$nextTick(() => {})
  },
  methods: {
    // getCurrentHeight (item) {
    //   var img = new Image()
    //   img.src = item.url
    //   if (img.width > 0 || img.height > 0) {
    //     item.height = item.width * (img.height / img.width)
    //     return
    //   }
    //   const timer = setInterval(() => {
    //     if (img.width > 0 || img.height > 0) {
    //       item.height = item.width * (img.height / img.width)
    //       clearInterval(timer)
    //     }
    //   }, 30)
    // },
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
.notice-box {
  display: flex;
  flex-direction: column;
  padding: 0 7px;
}
.item {
  margin-bottom: 22px;
}
.icon {
  font-size: 27px;
  color: #C10000
}
.title {
  text-align: left;
  height: 28px;
  line-height: 28px;
  display: flex;
}
.text {
  margin-left: 5px;
  display: inline-block;
  font-size: 12px;
  height: 28px;
  line-height: 28px;
}
.date {
  margin-left: 2px;
  font-size: 12px;
  color: #7E7E7E;
}
.content {
  width: 90%;
  margin-left: 28px;
  margin-top: 9px;
}
</style>
