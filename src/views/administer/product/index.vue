<template>
    <div>
        <WaterFall @loadmore="loadmore" class="item-box" :line-gap="200">
            <waterfall-slot v-for="(item, index) in productList" :width="item.width" :height="item.height" :order="index" :key="item.index"  move-class="item-move">
                <div class="item">
                    <img style="width: 100%" :src="item.mainImgList && item.mainImgList[0].thumbUrl" alt="" @load="getCurrentHeight(item)">
                    <div class="desc">
                        <div class="left" :title="item.name">{{item.name | ellipsis(6)}}</div>
                        <div class="right">
                            <div class="delete" @click.stop="deleteProduct(item)">删除</div>
                            <div class="move" @click.stop="showDialog(item)">编辑</div>
                            <div class="operation" @click.stop="move(item, index, 'down', items)" v-if="index !== items.length - 1">后移</div>
                            <div class="operation" @click.stop="move(item, index, 'up', items)" v-if="index !== 0">前移</div>
                        </div>
                    </div>
                </div>

            </waterfall-slot>
        </WaterFall>
        <!-- <ul>
                    <li class="item" @click="showDialog(item)" v-for="(item, index) of productList" :key="index">
                        <img :src="item.mainImgList && item.mainImgList[0].thumbUrl" alt="">
                        <div class="desc">
                            <div class="left" :title="item.name">{{item.name | ellipsis(6)}}</div>
                            <div class="right">
                                <div class="delete" @click.stop="deleteProduct(item)">删除</div>
                                <div class="move" @click.stop="showDialog(item)">编辑</div>
                                <div class="operation" @click.stop="move(item, index, 'down', productList)" v-if="index !== productList.length - 1">后移</div>
                                <div class="operation" @click.stop="move(item, index, 'up', productList)" v-if="index !== 0">前移</div>

                            </div>
                        </div>
                    </li>
                    <ProductEdit :show="showDialog" :pId="productInfo.pId"></ProductEdit>
                    <Confirm :show="showConfirm" :title="title" @close="showConfirm=false" @ok="sure" :content="confirmContent"></Confirm>
                </ul> -->
        <ProductEdit :show="showDialog" :pId="productInfo.pId"></ProductEdit>
        <Confirm :show="showConfirm" :title="title" @close="showConfirm=false" @ok="sure" :content="confirmContent"></Confirm>
    </div>
</template>

<script>
import store from 'store/admin'
import ProductEdit from '@/components/ProductEdit'
import Confirm from '@/components/common/Confirm'

import WaterFall from '@/components/common/WaterFall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import { getImageHeightByWidth } from '@/utils'
export default {
  components: {
    ProductEdit,
    Confirm,
    WaterFall,
    WaterfallSlot
  },
  created () {
    store.dispatch('getProducts', {
      lId: this.id
    })
  },
  computed: {
    items () {
      const items = store.state.productList.map(e => {
        return {
          ...e,
          width: 700,
          height: 200
        }
      })
      return items
    },
    // productList () {
    //   return store.state.productList
    // },
    id () {
      return +this.$route.params.id
    }
  },
  watch: {
    id (val) {
      store.dispatch('getProducts', {
        lId: this.id
      })
    },
    items (val) {
      this.productList = val
    }
  },
  data () {
    return {
      productInfo: {},
      showConfirm: false,
      title: '提示',
      confirmContent: '',
      productList: store.state.productList
      // isEdit: true
    }
  },
  methods: {
    getCurrentHeight (item) {
      if (!item.mainImgList || !item.mainImgList[0]) return
      getImageHeightByWidth((item.mainImgList[0] || {}).thumbUrl, item.width).then(height => {
        console.log('height: ', item)
        item.height = height

        console.log('item: ', item.height)
      })
    },
    loadmore () {},
    sure () {
      store.dispatch('deleteProduct', {
        id: this.productInfo.id,
        lId: this.productInfo.lId
      }).then(() => {
        this.showConfirm = false
      })
    },
    move (item, index, type, list) {
      if (!type) return
      const target = type === 'up' ? list[index - 1] : list[index + 1]
      store.dispatch('moveProduct', {
        start: item.id,
        end: target.id,
        lId: item.lId
      })
    },
    deleteProduct (item) {
      if (!item) return
      this.productInfo = item
      this.showConfirm = true
      this.confirmContent = '确定删除 ' + item.name + ' 吗？'
    },
    showDialog (item) {
      if (!item) return
      this.productInfo = item
      store.commit('setEditing', true)
      store.commit('setEditInfo', this.productInfo)
      store.commit('setEditDiologShow', true)
    }
  }
}
</script>

<style scoped lang="scss">
.item {
    // width: 200px; // border-radius: 20px;
    // overflow: hidden;
    // margin-left: 20px;
    // margin-top: 20px;
    // padding: 5px;
    // float: left;
    // position: relative;
    position: absolute;
    top: 0;
    left: 12px;
    right: 0;
    img {
        width: 100%;
        border-radius: 10px;
    }
    .desc {
        position: absolute;
        left: 0;
        bottom: 5px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        .left,
        .right {
            // width: 20px;
            text-align: left;
            // margin-left: 10px;
            font-size: 12px;
            flex: 1
        }
        .right {
            // display: flex;
            text-align: right;
            // flex: 6;
            flex: 0 0 110px;
            // width: 120px;
            div {
                cursor: pointer;
                margin-right: 2px;
                float: right;
            }
        }
    }
}
</style>
