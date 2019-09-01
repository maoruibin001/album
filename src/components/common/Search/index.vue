<template>
  <div class="search-bar" :class="{'top-gap': needGap, 'left-gap': isPc}">
    <div class="search-container">
      <div class="search-box">
        <span class="search-icon iconfont iconzu7"></span>
        <input type="text" @change="search(searchText)" v-model="searchText" class="search-input" placeholder="查找">
      </div>
      <div class="person-box" @click="toUser()">
        <div class="person-icon iconfont iconfuhao"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { isPc } from '@/utils'
import store from 'store/front'
export default {
  data () {
    return {
      isPc: isPc(),
      searchText: ''
    }
  },
  computed: {
    needGap () {
      return ['/', '/notice', '/home', '/collect', '/classify'].indexOf(this.$route.path) !== -1
    },
    homeItems () {
      const items = store.state.productList.map(e => {
        return {
          ...e,
          width: 130,
          height: 140
        }
      })
      return items
    }
  },

  methods: {
    toUser () {
      this.$router.push('/user')
    },

    search (text) {
      const path = this.$route.path
      switch (path) {
        case '/':
        case '/classify':
          store.dispatch('getProducts', {
            pId: -1
          }).then(() => {
            if (!text) {
              store.commit('setProductList', this.homeItems)
              return
            }
            const items = this.homeItems.filter(e => {
              return e.name.indexOf(text) !== -1
            })
            store.commit('setProductList', items)
          })
          break
        case '/collect':
        case '/notice':
          store.dispatch('getProducts', {
            pId: -100
          }).then(() => {
            if (!text) {
              store.commit('setProductList', this.homeItems)
              return
            }
            const items = this.homeItems.filter(e => {
              return e.name.indexOf(text) !== -1
            })
            store.commit('setProductList', items)
          })
          break
        default:
          break
      }
      console.log()
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
  height: 28px;
  background-color: #fff;
  padding: 0;
  margin: 0;
  font-size: 12px;
  z-index: 100;
  padding: 3px 0;
  /* margin-left: 5px; */
}
.top-gap {
  padding-bottom: 13px;
}
.left-gap {
  margin-left: 46px;
}
.search-container {
  margin-left: 13px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
.search-box {
  width: 80%;
  max-width: 500px;
  background-color: #EBEBEB;
  height: 28px;
  border-radius: 20px;
  position: relative;
  border: none;
  display: flex;
  overflow: hidden;
}

.search-icon {
  position: absolute;
  left: 5px;
  font-size: 18px;
  top: 4px;
  /* color: #777; */
  z-index: 10;
}

.search-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 80%;
  height: 26px;
  left: 31px;
  background-color: #EBEBEB;
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
.person-icon {
  font-size: 18px;
}

</style>
