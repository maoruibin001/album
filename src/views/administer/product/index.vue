<template>
  <ul>
    <li class="item" @click="showDialog()" v-for="(item, i) of productInfo.mainImgList || []" :key="i">
      <img :src="item.url" alt="">
      <div class="desc">
        <div class="left">{{productInfo.name}}</div>
        <div class="right">
          <div class="move" @click.stop="move">移动</div>
          <div class="delete" @click.stop="deleteProduct">删除</div>
        </div>
      </div>
    </li>
     <ProductEdit :show="showDialog" :pid="productInfo.pid"></ProductEdit>
     <Confirm :show="showConfirm" :title="title" @close="showConfirm=false" @ok="sure" :content="confirmContent"></Confirm>
  </ul>
</template>
<script>
import store from 'store/admin'
import ProductEdit from '@/components/ProductEdit'
import Confirm from '@/components/common/Confirm'
export default {
  components: {
    ProductEdit,
    Confirm
  },
  created () {
    store.dispatch('getProduct', {
      id: this.id
    })
  },
  computed: {
    productInfo () {
      return store.state.productInfo || {}
    },
    id () {
      return +this.$route.params.id
    }
  },
  watch: {
    id (val) {
      store.dispatch('getProduct', {
        id: this.id
      })
    }
  },
  data () {
    return {
      showConfirm: false,
      title: '提示',
      confirmContent: ''
      // isEdit: true
    }
  },
  methods: {
    sure () {
      store.dispatch('deleteProduct', {
        id: this.id
      }).then(() => {
        this.showConfirm = false
      })
    },
    move () {},
    deleteProduct () {
      this.showConfirm = true
      this.confirmContent = '确定删除 ' + this.productInfo.name + ' 吗？'
    },
    showDialog () {
      store.commit('setEditing', true)
      store.commit('setEditInfo', this.productInfo)
      store.commit('setEditDiologShow', true)
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  width: 200px;
  // border-radius: 20px;
  overflow: hidden;
  margin-left: 20px;
  margin-top: 20px;
  padding: 5px;
  float:left;
  position: relative;
  img {
    width: 100%;
    border-radius: 10px;
  }
  .desc {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: flex;
    .left,.right {
      // width: 20px;
      font-size: 12px;
      flex: 1
    }
    .right {
      // display: flex;
      text-align: right;
      div {
        cursor: pointer;
        margin-left: 10px;
        float: right;
      }
    }
  }
}
</style>
