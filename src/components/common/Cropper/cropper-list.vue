<template>
    <ul :style="styleObj">
      <li class="change item" :style="itemStyleObj" v-for="(item, key) of items" :key="key">
        <cropperItem @fileChange='changeImg' @deleteImg="deleteImg" :id="item.identId" :img="item.url" :thumbImg="item.thumbUrl" :index="key"></cropperItem>
      </li>
      <li class="add item" :style="itemStyleObj" >
        <cropperItem @fileChange='addImg' :img="newImg"></cropperItem>
      </li>
    </ul>
</template>
<script>
import cropperItem from './cropper-item'
export default {
  components: {
    cropperItem
  },
  props: {
    styleObj: {
      type: Object,
      default: () => ({})
    },
    itemStyleObj: {
      type: Object,
      default: () => ({})
    },
    imgInfoList: {
      type: Array,
      default: () => []

    }
  },
  data () {
    return {
      identId: 0,
      newImg: '',
      items: this.imgInfoList
    }
  },
  methods: {
    addImg (info) {
      // this.items[info.index] = info
      this.identId++
      info.identId = this.identId
      this.items.push(info)
      this.newImg = ''
      this.$emit('fileChange', this.items)
    },
    changeImg (info) {
      const index = this.items.findIndex(e => e.identId === info.id)
      this.items[index] = Object.assign(this.items[index], info)
    },
    deleteImg (info) {
      const index = this.items.findIndex(e => e.identId === info.id)
      this.items.splice(index, 1)
    }
  }
}
</script>
<style scoped lang="scss">
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    li {
      padding: 0;
      margin: 0;
      display: flex;
      margin-right: 10px;
      // width: 100px;
      // height: 100px;
    }
  }

</style>
