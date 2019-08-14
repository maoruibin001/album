<template>
  <div id="app">
    <Search v-if = "showNavbar"/>
    <router-view  class="top-gap"/>
    <Navbar v-if = "showNavbar"></Navbar>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar'
import Search from '@/components/common/Search'
// import "../static/font/iconfont.css";
export default {
  name: 'App',
  components: {
    Navbar,
    Search
  },
  computed: {
    showNavbar () {
      return ['/', '/notice', '/home', '/collect', '/classify', '/littleClass'].indexOf(this.$route.path) !== -1
    },
    needGap () {
      return ['/', '/notice', '/home', '/collect', '/classify'].indexOf(this.$route.path) !== -1
    }
  }
}
</script>

<style>
@import url("../static/font/iconfont.css");
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
  margin-top: 34px;
}
</style>
