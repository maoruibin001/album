<template>
    <div style="" class="product-container" :style="{width: width}">
        <div class="nav">
            <div class="left">
                欢迎您：{{userInfo.name}}
            </div>
            <div class="right">
                <div class="nav-item addUser" v-if="userInfo.isKeeper" @click="toAccount()">添加管理员</div>
                <div class="nav-item addUser" @click="modifyAccount()">修改账号资料</div>
                <div class="nav-item addUser" @click="getLink()">获取客户端链接</div>
                <div class="nav-item addUser" @click="bandLittleProgram()">{{littleProgramInfo.appid ? '已绑定小程序' : '绑定小程序'}}</div>
                <div class="nav-item logout" @click="logout()">退出</div>

            </div>
        </div>
        <waterfall :imgsArr="items" :maxCols="4" ref="waterfall" :loadingDotStyle="{}">
            <div class="desc" slot-scope="props">
                <div class="left" :title="props.value.name">{{props.value.name | ellipsis(6)}}</div>
                <div class="right">
                    <div class="delete" @click.stop="deleteProduct(props.value)">删除</div>
                    <div class="move" @click.stop="showDialog(props.value)">编辑</div>
                    <div class="operation" @click.stop="move(props.value, props.index, 'down', items)" v-if="props.index !== items.length - 1">后移</div>
                    <div class="operation" @click.stop="move(props.value, props.index, 'up', items)" v-if="props.index !== 0">前移</div>
                </div>
            </div>
        </waterfall>
        <ProductEdit :show="showDialog" :pId="productInfo.pId"></ProductEdit>
        <Confirm :show="showConfirm" :title="title" @close="showConfirm=false" @ok="sure" :content="confirmContent"></Confirm>
        <Confirm :show="showLittleConfirm" :title="title" @close="showLittleConfirm=false" @ok="bind">
          <div style="text-align: left;margin-bottom: 10px;">
            小程序appid: &nbsp;<input type="text" placeholder="请输入小程序appid" v-model="appid">
          </div>
          <div style="text-align: left;" v-if="littleProgramInfo.appid">
            小程序版本号: <input type="text" placeholder="请输入小程序版本号" v-model="version">
          </div>
        </Confirm>
    </div>
</template>

<script>
import store from 'store/admin'
import userStore from 'store/user'
import ProductEdit from '@/components/ProductEdit'
import Confirm from '@/components/common/Confirm'

// import WaterFall from '@/components/common/WaterFall'
// import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import { getImageHeightByWidth, getItem } from '@/utils'
export default {
  components: {
    ProductEdit,
    Confirm
    // WaterFall,
    // WaterfallSlot
  },
  created () {
    store.dispatch('getProducts', {
      lId: this.id,
      pageSize: 1000
    })
    store.dispatch('getBindLitteProgram')
  },
  mounted () {
    this.$refs.waterfall.waterfallOver()
  },
  computed: {
    littleProgramInfo () {
      const info = store.state.littleProgramInfo
      return info
    },
    userInfo () {
      let info = userStore.state.userInfo || {}
      if (!info.id) {
        const localInfo = getItem('userInfo')
        info = localInfo ? JSON.parse(localInfo) : {}
      }
      return info
    },
    items () {
      const items = store.state.productList.map(e => {
        return {
          ...e,
          src: e.mainImgList[0].thumbUrl,
          width: 700,
          height: 200
        }
      })
      return items
    },
    flag () {
      return userStore.state.flag || getItem('flag')
    },
    id () {
      return +this.$route.params.id
    }
  },
  watch: {
    littleProgramInfo (val) {
      if (val && val.appid) {
        this.appid = val.appid
        this.version = val.version
      }
    },
    id (val) {
      store.dispatch('getProducts', {
        lId: this.id
      })
    },
    items (val) {
      this.productList = val
      if (!val || val.length === 0) {
        this.$refs.waterfall.waterfallOver()
      }
    }
  },
  data () {
    return {
      version: 0,
      appid: '',
      showLittleConfirm: false,
      width: document.body.clientWidth - 255 + 'px',
      imgsArr: [],
      group: 0, // request param
      productInfo: {},
      showConfirm: false,
      title: '提示',
      confirmContent: '',
      productList: store.state.productList
      // isEdit: true
    }
  },
  methods: {
    bind () {
      store.dispatch('bindLittleProgram', {
        appid: this.appid,
        version: +this.version
      }).then(() => {
        this.showConfirm = false
      })
    },
    getLink () {
      this.showConfirm = true
      this.title = '客户端链接'
      this.confirmContent = location.protocol + '//' + location.host + '/?' + this.flag
    },
    bandLittleProgram () {
      this.showLittleConfirm = true
      this.title = this.littleProgramInfo.appid ? '修改小程序信息' : '绑定小程序'
      this.confirmContent = ''
    },
    logout () {
      this.$router.push('/login')
    },
    toAccount () {
      this.$router.push('/account')
    },
    modifyAccount () {
      this.$router.push({
        path: '/account',
        query: {
          isModify: 1
        }
      })
    },
    getData () {},
    getCurrentHeight (item) {
      if (!item.mainImgList || !item.mainImgList[0]) return
      getImageHeightByWidth((item.mainImgList[0] || {}).thumbUrl, item.width).then(height => {
        item.height = height
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
.product-container {
    height: 100%;
    position: relative;
    left: 255px;
}

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
}

.desc {
    position: absolute;
    left: 0;
    bottom: 5px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
    color: #fff;
    .left,
    .right {
        // width: 20px;
        text-align: left; // margin-left: 10px;
        font-size: 12px;
        flex: 1
    }
    .left {
        margin-left: 20px;
    }
    .right {
        // display: flex;
        text-align: right; // flex: 6;
        flex: 0 0 110px; // width: 120px;
        margin-right: 10px;
        div {
            cursor: pointer;
            margin-right: 2px;
            float: right;
        }
    }
}

.nav {
    background-color: #f0ebeb;
    display: flex;
    .left {
        flex: 1;
        text-align: left;
    }
    .right {
        flex: 1;
        text-align: right;
        .nav-item {
            display: inline-block;
            cursor: pointer;
            &:hover {
                color: red;
            }
        }
    }
}
</style>

<style>
.over {
    display: none
}
</style>
