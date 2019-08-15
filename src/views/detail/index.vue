<template>
  <div class="detail-box">
    <div class="detail-img">
      <img src="/static/test/1.jpg" class="w-100" alt="">
    </div>
    <div class="detail-btns">
      <div class="btn left" @click="show3d=true">
        产品3维展示
      </div>
      <div class="btn right">
        购买方案原型
      </div>
    </div>

    <ImgDialog :url='url' v-if="show3d" @close="show3d=false"></ImgDialog>
  </div>
</template>
<script>
import ImgDialog from '@/components/common/ImgDialog'
export default {
  components: {
    ImgDialog
  },
  data () {
    return {
      url: '/static/test/2.jpg',
      show3d: false
    }
  }

}
</script>

<style scoped>
.w-100 {
  width: 100%;
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
.btn  {
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
