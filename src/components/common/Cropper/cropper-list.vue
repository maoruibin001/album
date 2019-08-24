<template>
    <ul>
      <li class="change" v-for="(item, key) of items" :key="key">
        <cropperItem @change='changeImg' @deleteImg="deleteImg" :id="item.identId" :img="item.img" :index="key"></cropperItem>
      </li>
      <li class="add">
        <cropperItem @change='addImg' :img="newImg"></cropperItem>
      </li>
    </ul>
</template>
<script>
import cropperItem from './cropper-item'
export default {
  components: {
    cropperItem
  },
  data () {
    return {
      identId: 0,
      newImg: '',
      items: []
    }
  },
  methods: {
    addImg (info) {
      // this.items[info.index] = info
      this.identId++
      info.identId = this.identId
      this.items.push(Object.assign({}, info, {
        img: info.base64
      }))
      this.newImg = ''
    },
    changeImg (info) {
      const index = this.items.findIndex(e => e.identId === info.id)
      this.items[index] = Object.assign(this.items[index], info, {
        img: info.base64
      })
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
      width: 100px;
      height: 100px;
    }
  }

</style>
