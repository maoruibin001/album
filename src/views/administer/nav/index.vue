<template>
    <div class="admin-container" :style="{height: height + 'px'}">
        <div class="admin-nav">
            <div class="title">
                <div class="text">产品管理</div>
            </div>
            <div class="content">
                <ul>
                    <li class="big-class"  v-for='(item, index) of list' :key='index' @click="showDesc(item.id)">
                        <div class="title-box" :class="{active: item.id === activeId}">
                            <div class="left" :title="item.name">
                                {{item.name | ellipsis(6)}}
                            </div>
                            <div class="right">
                                <div class="operation" @click.stop="addProduct(item.id)">添加</div>
                                <div class="operation">移动</div>
                                <div class="operation">重命名</div>
                            </div>
                        </div>

                        <ul>
                            <li class="little-class" :class="{active: e.id === activeId}" @click.stop="showDesc(e.id)" v-for="(e, i) of item.children" :key="i">
                                <div class="title-box">
                                    <div class="left" :title="e.name">
                                        &nbsp;&nbsp;{{e.name | ellipsis(5)}}
                                    </div>
                                    <div class="right">
                                        <div class="operation">主图</div>
                                        <div class="operation">移动</div>
                                        <div class="operation">重命名</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="footer" @click="addProduct(-1)">
                <div class="text">添加产品</div>
            </div>
        </div>
        <div class="admin-child">
            <router-view />
        </div>
        <ProductEdit :pId="pId"></ProductEdit>
    </div>
</template>

<script>
import store from 'store/admin'
import ProductEdit from '@/components/ProductEdit'

export default {
  components: {
    ProductEdit
  },
  data () {
    return {
    //   isEdit: false,
      activeId: -2,
      pId: -1,
      showDialog: false,
      height: window.screen.availHeight - 15
    }
  },
  computed: {
    list () {
      return store.state.productList
    }
  },
  created () {
    store.dispatch('getProducts')
  },
  mounted () {},
  methods: {
    addProduct (pId) {
      if (!pId) return
      this.pId = pId
      const editInfo = {
        name: '',
        mainImgList: [],
        descImgThumb: '',
        descImg: '',
        // gifImgThumb: '',
        gifImg: '',
        originFile: '',
        prize: 0
      }
      store.commit('setEditing', false)
      store.commit('setEditInfo', editInfo)
      store.commit('setEditDiologShow', true)
    },
    showDesc (id) {
      this.activeId = id
      this.$router.push('/admin/' + id)
    }
  }

}
</script>

<style scoped lang="scss">
ul {
    padding: 0;
    margin: 0;
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
}

.admin-container {
    display: flex;
    width: 100%; // height: 100%;
    // min-height: 400px;
    background-color: #ccc;
    .admin-nav {
        position: relative;
        width: 200px; // flex: 1; // display: flex;
        flex-direction: column;
        .title {
            // flex: 2;
            background-color: #000;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            .text {
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding: 15px;
            }
        }
        .content {
            .active {
                color:#c10000;
            }
            // flex: 10
            .big-class {
                cursor: pointer;
                text-align: left;
                margin-bottom: 10px;
                padding: 5px;
                font-weight: bold;
                position: relative;
                .title-box {
                    display: flex;
                    .left {
                        font-size: 16px;
                        flex: 1;
                    }
                    .right {
                        flex: 1; // position: absolute;
                        // right: 0;
                        display: flex;
                        .operation {
                            float: left;
                            font-size: 12px;
                            margin-right: 3px;
                            height: 23px;
                            line-height: 23px;
                            cursor: pointer; // flex: 1;
                        }
                    }
                }
                .little-class {
                    font-weight: 400;
                    cursor: pointer;
                    padding-top: 6px;
                    // margin-left: 10px;
                    .left {
                      // margin-left: 2px;
                      font-size: 12px;
                    }
                }
            }
        }
        .footer {
            cursor: pointer;
            background-color: #000;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 8px;
            .text {
                width: 100%;
                height: 20px;
                line-height: 20px;
                padding: 15px;
            }
        }
    }
    .admin-child {
        flex: 5;
        background-color: #fff;
    }
}

</style>
