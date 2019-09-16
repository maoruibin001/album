<template>
  <ul :class="isPc ? 'pc-nav-bar' : 'nav-bar'">
    <li :class="isPc ? 'pc-bar-item' : 'bar-item'" v-for="(item, i) of navList" :key="i" @click="chooseItem(item)">
      <div :class="{'pc-item-box': isPc, active: item.isActive}">
        <div class="icon iconfont" :class="item.iconClass">
          <!-- <img :src="item.isActive ? item.activeIconUrl: item.iconUrl" alt /> -->
        </div>
        <div class="text">{{item.text}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import { isPc } from '@/utils'
export default {
  data () {
    return {
      isPc: isPc(),
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
          params: {},
          children: [
            {
              id: 5,
              text: '小类',
              isActive: false,
              iconClass: 'iconzu2',
              path: '/littleClass',
              params: {}
            }
          ]
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
    let activeItem = null
    if (path) {
      for (const e of this.navList) {
        if (e.path === path) {
          activeItem = e
          break
        }
        if (e.children) {
          for (const ele of e.children) {
            if (path.indexOf(ele.path) !== -1) {
              activeItem = e
              break
            }
          }
        }
      }
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
.pc-nav-bar {
  display: flex;
  position: fixed;
  z-index: 110;
  top: 100px;
  left: 46px;
  width: 400px;
  height: 46px;
  background-color: #F0EFEF;
  transform-origin: left top;
  transform: rotate(90deg);
  font-size: 12px;
}
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
.pc-bar-item {
  flex: 1;
  transform-origin: right top;
  transform: rotate(-90deg);
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  position: relative;
  justify-content: bottom;
  align-items: bottom;
  cursor: pointer;
  left: -100px;
}
.pc-item-box {
  position:absolute;
  right: 12px;
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
  height: 24px;
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
