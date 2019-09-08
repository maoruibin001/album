<template>
    <scroller refreshText="刷新中..." :on-refresh="refresh">
      <div  style="padding: 0 10px;">
        <WaterFall @loadmore="loadmore" class="box" @reflowed="reflowed" :fixed-height="true" line="v"  height="95%">
            <waterfall-slot class="slot-item" v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="item-move">
                <div class="item" @click="toLittleClass(item)">
                    <div class="title">{{item.name}}</div>
                    <div class="img-box">
                        <div class="left" :style="{'background-image': `url(${item.children[0].mainImgThumb})`}">
                            <!-- <img :src="item.children[0].mainImgThumb" :ref="item.id" @load="getCurrentHeight(item)" style="width: 100%" alt /> -->
                        </div>
                        <div class="right">
                            <div class="r-item top" :style="{'background-image': `url(${(item.children[1] || item.children[0]).mainImgThumb})`}"></div>
                            <div class="r-item bottom" :style="{'background-image': `url(${(item.children[2] || item.children[1] || item.children[0]).mainImgThumb})`}"></div>
                            <!-- <img :src="(item.children[1] || item.children[0]).mainImgThumb" :ref="item.id" style="width: 100%" alt />
                                <img :src="(item.children[2] || item.children[1] || item.children[0]).mainImgThumb" :ref="item.id" style="width: 100%" alt /> -->
                        </div>
                    </div>
                </div>

            </waterfall-slot>
        </WaterFall>
      </div>

    </scroller>
</template>

<script>
import WaterFall from '@/components/common/WaterFall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import store from 'store/admin'
// const items = []
// for (let i = 0; i < 11; i++) {
//   items.push({
//     id: i,
//     width: 180,
//     height: 155,
//     url: `static/test/${i % 5 + 1}.jpg`,
//     url2: `static/test/${i % 4 + 1}.jpg`,
//     url3: `static/test/${i % 3 + 2}.jpg`
//   })
// }
export default {
  components: {
    WaterFall,
    WaterfallSlot
    // PullTo
  },
  created () {
    store.dispatch('getBserieses')
  },
  computed: {
    items () {
      const items = store.state.bseriesList.map(e => {
        return {
          ...e,
          width: 130,
          height: 120
        }
      })
      return items
    },
    isEnd () {
      return store.state.isEnd
    },
    pageNo () {
      return store.state.pageNo
    }
  },
  data () {
    return {
      // items: items.map(e => ({ ...e })),
      // itemWidth: 0
    }
  },
  methods: {
    getCurrentHeight (item) {
      // console.log(item.width)
      // getImageHeightByWidth(item.url, item.width, 12, 42).then(height => {
      //   item.height = height
      // })
    },
    toLittleClass (item) {
      this.$router.push(`/${item.bId}/littleClass`)
    },
    reflowed () {
      // this.itemWidth = $(".slot-item").width();
    },
    refresh (done) {
      store.dispatch('getProducts', {
        pId: -1
      }).then(() => {
        done()
      }).catch(() => {
        done()
      })
    },
    loadmore (done) {
      // done()
      if (this.isEnd) {
        return
      }
      store.dispatch('getProducts', {
        pageNo: this.pageNo + 1,
        pId: -1
      }).then(() => {
        done()
      }).catch(() => {
        done()
      })
    },

    stateChange (state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom'
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading'
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish'
      }
    }
  }
  // loadmore () {
  //   this.items.push.apply(
  //     this.items,
  //     items.map(e => {
  //       return Object.assign(e, {
  //         id: e.id + 100
  //       })
  //     })
  //   )
  // }
  // }
}
</script>

<style scoped lang="scss">
.box {
    margin-left: -8px;
}

.item {
    height: 100%;
    position: absolute;
    top: 0;
    left: 12px;
    right: 0;
    bottom: 12px;
    background-color: #ffff;
}

.title {
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-family: Regular;
    font-size: 12px;
    background-color: #F2F2F2;
}

.img-box {
    display: flex;
    /* width: 95%; */
    padding: 0 6px;
    background-color: #F2F2F2;
    height: 100px;
}

.left {
    flex: 5;
    display: flex;
    background-repeat: no-repeat;
    background-size: cover;
}

.right {
    flex: 2;
    display: flex;
    flex-direction: column;
    .r-item {
      flex: 1;
        background-repeat: no-repeat;
        background-size: cover;
    }
}

.left>img {
    align-self: stretch;
}

.right>img {
    flex: 1;
}
</style>
