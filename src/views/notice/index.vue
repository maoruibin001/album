<template>
    <scroller ref="scroller" refreshText="刷新中..." :on-refresh="refresh" height="95%" :on-infinite="loadmore">
        <div class="notice-box">
            <div class="item" @click="toDetail(item)" v-for="(item, i) in items" :key="i">
                <div class="title">
                    <div class="icon iconfont" :class="item.icon"></div>
                    <div class="text">{{item.name}}</div>
                    <div class="date">{{item.modifyDate | getGapDay}}</div>
                </div>
                <div class="content">
                    <img :src="item.mainImgList[0].url" :ref="item.id" style="width: 100%;max-width: 600px;" alt />
                </div>
            </div>
        </div>
        <nodata v-if="isEnd"></nodata>
    </scroller>
</template>

<script>
import { getGapDay } from '@/utils/date'
import store from 'store/admin'
import { wait } from '@/utils'
export default {
  components: {},
  data () {
    return {
      // items: items.map(e => ({ ...e })),
      // itemWidth: 0
    }
  },
  computed: {
    items () {
      const items = store.state.productList.map(e => {
        return {
          ...e,
          width: 130,
          height: 140
        }
      })
      return items
    },
    isEnd () {
      return store.state.isEnd
    },
    pageNo () {
      return store.state.pageNo
    },
    isLoading () {
      return store.state.isLoading
    }
  },
  created () {
    store.dispatch('getProducts', {})
  },
  filters: {
    getGapDay
  },
  methods: {
    toDetail (item) {
      if (!item.id) return
      this.$router.push('/detail/' + item.id)
    },
    refresh (done) {
      wait(store.dispatch('getProducts')).then(() => {
        done()
      }).catch(e => {
        done()
      })
    },
    loadmore (done) {
      if (this.isEnd) {
        this.$refs.scroller.finishInfinite()
        return
      }
      if (this.isLoading) {
        return
      }
      store.commit('setIsLoading', true)
      wait(store.dispatch('getProducts', {
        pageNo: this.pageNo + 1
      })).then(() => {
        done()
      }).catch(e => {
        done()
      })
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
    display: flex;
}
</style>
