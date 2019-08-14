<template>
  <ul class="nav-bar">
    <li class="bar-item" v-for="(item, i) of navList" :key="i" @click="chooseItem(item)">
      <div class="item-box" :class="{active: item.isActive}">
        <div class="icon iconfont" :class="item.iconClass">
          <!-- <img :src="item.isActive ? item.activeIconUrl: item.iconUrl" alt /> -->
        </div>
        <div class="text">{{item.text}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {
          id: 1,
          text: '首页',
          isActive: true,
          iconClass: 'iconzu3',
          path: '/',
          params: {}
        },
        {
          id: 2,
          text: '分类',
          isActive: false,
          iconClass: 'iconzu2',
          path: '/classify',
          params: {}
        },
        {
          id: 3,
          text: '通知',
          isActive: false,
          iconClass: 'iconzu1',
          path: '/notice',
          params: {}
        },
        {
          id: 4,
          text: '收藏',
          isActive: false,
          iconClass: 'iconzu4',
          path: '/collect',
          params: {}
        }
      ]
    }
  },
  created () {
    const path = this.$route.path
    if (path) {
      const activeItem = this.navList.find(e => e.path === path)
      activeItem && this.chooseItem(activeItem, true)
    }
  },
  methods: {
    chooseItem (item, isDisable) {
      if (!item) return

      this.navList.forEach(e => {
        e.isActive = e.id === item.id
      })
      if (isDisable) return
      this.$router.push(item.path)
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 46px;
  background-color: #F0EFEF;
  padding: 0;
  margin: 0;
  font-size: 12px;
}
.bar-item {
  flex: 1;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.icon {
  width: 20px;
  height: 20px;
  font-size: 20px;
  margin: 0 auto;
}
.icon img {
  width: 100%;
  height: 100%;
}
.active {
  color: #C10000;
}
.text {
  font-size: 8px;
  font-family: Regular;
}
</style>
