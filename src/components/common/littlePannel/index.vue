<template>
  <div class="little-pannel" v-if="isShow" @click.stop>
    <ul class="item-box">
      <li class="item" >
        <span @click.stop="tabCollection">{{isCollection ? "已收藏" : '收藏'}}</span></li>
      <!-- <li class="item" @click.stop="share">分享</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    isCollection: {
      type: Number,
      default: 0
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    tabCollection () {
      this.$emit('tabCollection', this.id)
    },
    close () {
      this.$emit('close')
    },
    share () {
      console.log('share')
    }
  }
}
</script>
<style scoped lang="scss">
.little-pannel {
    width: 100px;
    min-height: 20px;
    background-color: #cecece;
    position: absolute;

      right: 33px;
      top: -6px;
    z-index: 2;
    box-shadow: 5px 5px 5px rgba(0,0,0, .3);

    .item {
      padding: 0;

      margin: 0px auto;
      width: 80%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      border-bottom: 1px solid #cecece;
    }
}
</style>
