<template>
  <div class="search-bar">
    <div class="search-container">
      <div class="search-box">
        <span class="search-icon iconfont iconzu7"></span>
        <input type="text" class="search-input" placeholder="查找">
      </div>
      <div class="person-box">
        <div class="person-icon iconfont iconfuhao"></div>
      </div>
    </div>
  </div>
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
.search-bar {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #fff;
  padding: 0;
  margin: 0;
  font-size: 12px;
  z-index: 100;
  padding: 10px 20px;
}
.search-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
.search-box {
  width: 80%;
  max-width: 500px;
  background-color: #dfdedf;
  height: 40px;
  border-radius: 20px;
  position: relative;
  border: none;
}

.search-icon {
  position: absolute;
  left: 10px;
  font-size: 24px;
  top: 6px;
  color: #777;
  z-index: 10;
}

.search-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 80%;
  height: 95%;
  left: 35px;
  background-color: #dfdedf;
  outline: none;
  border: none;
  /* border-radius: 20px; */
}

.person-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
}

</style>
