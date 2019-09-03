<template>
    <div class="admin-container" :style="{height: height + 'px'}">
        <div class="admin-nav">
            <div class="title">
                <div class="text" @click="addSeries()">+产品管理</div>
            </div>
            <div class="content">
                <ul>
                    <li class="big-class"  v-for='(item, index) of list' :key='index'>
                        <div class="title-box" :class="{active: item.bid === activeId}">
                            <div class="left" :title="item.name">
                                {{item.name | ellipsis(6)}}
                            </div>
                            <div class="right">
                                 <div class="operation" @click.stop="deleteSeries(item)">删除</div>
                                <div class="operation" @click.stop="addLseries(item.bId)">添加</div>
                                <div class="operation" @click.stop="move(item, index, 'up', list)" v-if="index !== 0">上移</div>
                                <div class="operation" @click.stop="move(item, index, 'down', list)" v-if="index !== list.length - 1">下移</div>
                                <div class="operation" @click.stop="changeSeries(item)">编辑</div>
                            </div>
                        </div>

                        <ul>
                            <li class="little-class" :class="{active: e.lId === activeId}" @click.stop="showDesc(e)" v-for="(e, i) of item.children" :key="i">
                                <div class="title-box">
                                    <div class="left" :title="e.name">
                                        &nbsp;&nbsp;{{e.name | ellipsis(5)}}
                                    </div>
                                    <div class="right">
                                        <!-- <div class="operation" >主图</div> -->
                                        <div class="operation" @click.stop="deleteLSeries(e)">删除</div>
                                        <div class="operation" v-if="i !== 0" @click.stop="moveL(e, i, 'up', item.children)">上移</div>
                                        <div class="operation" v-if="i !== item.children.length - 1" @click.stop="moveL(e, i, 'down', item.children)">下移</div>
                                        <div class="operation" @click.stop="changeLseries(e)">编辑</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="footer" @click="addProduct()">
                <div class="text">添加产品</div>
            </div>
        </div>
        <div class="admin-child">
            <router-view />
        </div>
        <ProductEdit :pId="pId"></ProductEdit>
        <BseriesEdit></BseriesEdit>
        <LseriesEdit></LseriesEdit>
        <Confirm :show="showConfirm" @close="showConfirm=false" @ok="sure" :content="confirmContent"></Confirm>

    </div>
</template>

<script>
import store from 'store/admin'
import ProductEdit from '@/components/ProductEdit'
import BseriesEdit from '@/components/BseriesEdit'
import LseriesEdit from '@/components/LseriesEdit'
import Confirm from '@/components/common/Confirm'
import { toast } from '@/utils'

export default {
  components: {
    ProductEdit,
    BseriesEdit,
    LseriesEdit,
    Confirm
  },
  data () {
    return {
      isBig: false,
      currentBseries: null,
      currentLseries: null,
      showConfirm: false,
      //   isEdit: false,
      confirmContent: '',
      activeId: -2,
      pId: -1,
      showDialog: false,
      height: window.screen.availHeight - 15
    }
  },
  computed: {
    list () {
      return store.state.bseriesList
    }
  },
  created () {
    store.dispatch('getBserieses')
  },
  methods: {
    addLseries (id) {
      if (!id) return
      const editInfo = {
        name: '',
        mainImg: '',
        mainImgThumb: '',
        bId: id
      }
      store.commit('setLEditing', false)
      store.commit('setLEditInfo', editInfo)
      store.commit('setLEditDiologShow', true)
    },
    changeLseries (item) {
      store.commit('setLEditing', true)
      store.commit('setLEditInfo', item)
      store.commit('setLEditDiologShow', true)
    },
    moveL (item, index, type, list) {
      if (!type) return
      const target = type === 'up' ? list[index - 1] : list[index + 1]
      store.dispatch('moveLseries', {
        start: item.lId,
        end: target.lId
      })
    },
    move (item, index, type, list) {
      if (!type) return
      const target = type === 'up' ? list[index - 1] : list[index + 1]
      store.dispatch('moveBseries', {
        start: item.bId,
        end: target.bId
      })
    },
    sure () {
      if (this.isBig) {
        if (!this.currentBseries) return
        store.dispatch('deleteBseries', this.currentBseries)
        this.showConfirm = false
      } else {
        if (!this.currentLseries) return
        store.dispatch('deleteLseries', this.currentLseries)
        this.showConfirm = false
      }
    },
    changeSeries (item) {
      store.commit('setBEditing', true)
      store.commit('setBEditInfo', item)
      store.commit('setBEditDiologShow', true)
    },
    deleteLSeries (item) {
      this.isBig = false
      this.showConfirm = true
      this.currentLseries = item
      this.confirmContent = '确定要删除小系列 ' + item.name + ' 吗？'
    },
    deleteSeries (item) {
      this.isBig = true
      this.showConfirm = true
      this.currentBseries = item
      this.confirmContent = '确定要删除大系列 ' + item.name + ' 吗？'
    },
    addSeries () {
      const editInfo = {
        name: ''
      }
      store.commit('setBEditing', false)
      store.commit('setBEditInfo', editInfo)
      store.commit('setBEditDiologShow', true)
    },
    addProduct () {
      if (!this.currentLseries || !this.currentLseries.lId) return toast('请先选中小系列')
      // this.pId = pId
      const editInfo = {
        lId: this.currentLseries.lId,
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
    showDesc (item) {
      if (!item.lId) return
      this.activeId = item.lId
      this.currentLseries = item
      this.$router.push('/admin/' + item.lId)
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
        width: 250px; // flex: 1; // display: flex;
        flex-direction: column;
        .title {
            // flex: 2;
            background-color: #000;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            .text {
                cursor: pointer;
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
                        // flex: 1; // position: absolute;
                        // right: 0;
                        width: 140px;
                        // display: flex;
                        .operation {
                            float: right;
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
                    .right {
                      width: 140px;
                    }
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
