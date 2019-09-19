<template>
    <div class="detail-box">
        <div class="detail-img">
            <img :src="productInfo.gifImg" class="w-100" alt="">
        </div>
    </div>
</template>

<script>

import store from 'store/admin'
export default {
  components: {
    // ImgDialog
  },
  data () {
    return {
      id: this.$route.params.id,
      url: '/static/test/2.jpg',
      show3d: false
    }
  },
  created () {
    store.dispatch('getProduct', {
      id: this.id
    })
  },
  computed: {
    productInfo () {
      return store.state.productInfo || {}
    }
  }

}
</script>

<style scoped>
.detail-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.w-100 {
    width: 97%;
}

.detail-btns {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 27px;
    width: 100%;
    bottom: 35px;
}

.btn {
    margin-right: 29px;
    height: 29px;
    line-height: 29px;
    text-align: center;
    border-radius: 13px;
    font-size: 12px;
    color: #EDEDED;
    padding: 0 19px;
}

.left {
    background-color: #454545;
    /* width: 96px; */
}

.right {
    background-color: #C10000;
    /* width: 94px; */
}
</style>
