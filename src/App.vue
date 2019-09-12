<template>
  <div id="app" :class="{'left-gap': isPc && !notNeedGap}">
    <Search v-if = "showNavbar"/>
    <router-view  :class="{'top-gap': !notNeedGap, 'bottom-gap': !notNeedGap}"/>
    <Navbar v-if = "showNavbar"></Navbar>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar'
import Search from '@/components/common/Search'
import { isPc } from '@/utils'
import store from '@/store/admin'
// import "../static/font/iconfont.css";
export default {
  name: 'App',
  components: {
    Navbar,
    Search
  },
  computed: {
    showNavbar () {
      return ['/', '/notice', '/home', '/collect', '/classify'].indexOf(this.$route.path) !== -1 || this.$route.path.indexOf('/littleClass') !== -1
    },
    needGap () {
      return ['/', '/notice', '/home', '/collect', '/classify'].indexOf(this.$route.path) !== -1
    },
    notNeedGap () {
      return this.$route.path.indexOf('/admin') !== -1 || this.$route.path.indexOf('/detail') !== -1
    }
  },
  created () {
    const flag = this.$route.query.flag
    if (!flag) return
    localStorage.setItem('flag', flag)
    store.commit('setFlag', flag)
  },
  data () {
    return {
      isPc: isPc()
    }
  }
}
</script>

<style>
@import url("../static/font/iconfont.css");
@import url("./assets/scss/common.scss");
body {
  margin: 0 13px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.top-gap {
  margin-top: 44px;
}
.left-gap {
  margin-left: 46px;
}
.bottom-gap {
  margin-bottom: 50px;
}
</style>
