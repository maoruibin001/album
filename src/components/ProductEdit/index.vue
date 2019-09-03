<template>
    <modal :visible.sync="editDiologShow" :styleObj="styleObj" @close="editDiologShow=false" :title="(isEdit ?'编辑' : '新增') + '产品'">
        <template v-slot:body>
                    <div class="form-container">
                      <div class="form">
                        <div class="item name">
                          <div class="left">产品名称</div>
                          <div class="right"><input type="text" placeholder="请输入产品名称" v-model="editInfo.name"></div>
                        </div>

                         <div class="item main">
                          <div class="left">产品主图</div>
                          <div class="right"><CroppperList :imgInfoList="editInfo.mainImgList" :itemStyleObj="itemStyleObj" @fileChange="updateMainImgList"></CroppperList></div>
                        </div>

                         <div class="item desc">
                          <div class="left">产品详情</div>
                          <div class="right"><CropperItem :img="editInfo.descImg" :thumbImg="editInfo.descImgThumb" :cropper="false"  @fileChange="updateDesc" @deleteImg="deleteDesc()"></CropperItem></div>
                        </div>

                         <div class="item gif">
                          <div class="left">产品动图</div>
                          <div class="right"><CropperItem :cropper="false" :img="editInfo.gifImg"  @fileChange="updateGif" @deleteImg="deleteGif()"></CropperItem></div>
                        </div>

                         <div class="item file">
                          <div class="left">产品原文件</div>
                          <div class="right">
                            <div class="upload">
                              <button class="btn file">
                                <CropperItem @fileChange="updateFile" :cropper="false" :styleObj="uploadStyleObj" addIcon="" tip="点击上传" :isImg="false"></CropperItem>
                                </button>
                              <span :class="{active: editInfo.originFile}">已上传</span>/
                              <span :class="{active: !editInfo.originFile}">未上传</span>
                            </div>
                            <div class="prize">
                              <span>原文件价格</span>
                              <input class="btn danger" v-model="editInfo.prize"> 元
                            </div>
                          </div>
                        </div>

                        <div class="item" @click="save()">
                          <button class="btn danger save">完成保存</button>
                        </div>
                      </div>
                    </div>
</template>
        </modal>
</template>

<script>
import modal from '@/components/common/Modal'
import CroppperList from '@/components/common/Cropper/cropper-list'
import CropperItem from '@/components/common/Cropper/cropper-item'
import store from 'store/admin'
import { toast } from '@/utils'
import { imgUploadApi } from '@/utils/cgiConfig'
// const uploadUrl = '/api/upload/image'
export default {
  props: {
    pId: {
      type: Number,
      default: -1
    }
  },
  computed: {
    editDiologShow: {
      get () {
        return store.state.editDiologShow
      },
      set (val) {
        store.commit('setEditDiologShow', val)
      }
    },
    isEdit () {
      return store.state.isEdit
    },
    editInfo: {
      get () {
        return store.state.editInfo
      },
      set (val) {
        store.commit('setEditInfo', val)
      }
    }
  },
  methods: {
    updateMainImgList (data) {
      this.editInfo.mainImgList = data
    },
    updateDesc (data) {
      this.editInfo.descImgThumb = data.thumbUrl
      this.editInfo.descImg = data.url
    },
    updateGif (data) {
      this.editInfo.gifImg = data.url
      this.editInfo.gifImgThumb = data.thumbUrl
    },
    updateFile (data) {
      this.editInfo.originFile = data.url
    },
    deleteDesc (data) {
      this.editInfo.descImgThumb = ''
      this.editInfo.descImg = ''
    },
    deleteGif (data) {
      this.editInfo.gifImg = ''
      this.editInfo.gifImgThumb = ''
    },
    checkEditInfo () {
      const checkList = [
        {
          key: 'name',
          type: 'string',
          value: '产品名称不能为空'
        },
        {
          key: 'mainImgList',
          type: 'array',
          value: '产品主图不能为空'
        },
        {
          key: 'descImg',
          type: 'string',
          value: '产品详情不能为空'
        },
        {
          key: 'gifImg',
          type: 'string',
          value: '产品动图不能为空'
        },
        {
          key: 'originFile',
          type: 'string',
          value: '产品原型不能为空'
        }
      ]
      for (const item of checkList) {
        if (item.type === 'string' && !this.editInfo[item.key]) {
          return item.value
        } else if (item.type === 'array' && this.editInfo[item.key].length < 1) {
          return item.value
        }
      }
      return ''
    },
    save () {
      const chekckStr = this.checkEditInfo()
      if (chekckStr) {
        return toast(chekckStr)
      }
      if (this.editInfo.pId === undefined) {
        this.editInfo.pId = this.pId
      }
      this.editInfo.prize = +this.editInfo.prize
      store.dispatch(this.isEdit ? 'editProduct' : 'addProduct', this.editInfo).then(() => {
        this.editDiologShow = false
      })
    }
  },
  components: {
    modal,
    CroppperList,
    CropperItem
  },
  data () {
    return {
      descImg: '',
      uploadFileUrl: imgUploadApi.uploadFile,
      // product: {},
      dialogShow: this.show,
      isUpload: false,
      styleObj: {
        backgroundColor: '#EBEBEB'
      },
      itemStyleObj: {
        width: '60px',
        height: '60px',
        backgroundColor: '#fff',
        borderRadius: '7px',
        overflow: 'hidden'
      },
      uploadStyleObj: {
        backgroundColor: '#EBEBEB',
        color: '#000'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form-container {
    width: 600px;
    height: 400px;
    display: flex;
    padding: 30px 40px;
    .form {
        width: 100%;
        .item {
            display: flex;
            margin-bottom: 30px;
            align-items: center;
            .left {
                // flex: 2;
                width: 100px;
                height: 25px;
                font-size: 14px;
                line-height: 25px;
                text-align: right;
            }
            .right {
              width: 500px;
              overflow:auto;
                display: flex;
                align-items: center;
                // flex: 3;
                margin-left: 30px;
            }
        }
        .name {
            .right input {
                height: 26px;
                left: 31px;
                background-color: #EBEBEB; // padding: 5px 20px;
                outline: none;
                border: none;
            }
        }
        .desc,.gif {
            .right{
                height: 60px;
                width: 60px;
                border-radius: 7px;
                overflow: hidden;
            }
        }
        .file {
          .right {
            width: 100%;
            display: flex;
            .upload {
              flex: 1;
              width: 150px;
              height: 32px;
              line-height: 32px;
              button {
                background-color: #ececec;
                margin-top: 7px;
                top: -15px;
              }
              .active {
                color: #C10000;
              }
            }
            .prize {
              flex: 1;
              display: flex;
              height: 40px;
              line-height: 40px;
              .danger {
                width: 60px;
                background-color: #C10000;

                // margin-top: 3px;
                margin: 3px 8px;
                // padding: 0 35px;
                align-items: center;
                border-radius: 15px;
              }
            }

          }
        }
        .save {
          width: 100%;
          height: 32px;
          border-radius: 16px;
        }
    }
}
</style>
