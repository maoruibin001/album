<template>
    <modal :visible.sync="editDiologShow" :styleObj="styleObj" @close="editDiologShow=false" :title="(isEdit ?'编辑' : '新增') + '小系列'">
        <template v-slot:body>
                    <div class="form-container">
                      <div class="form">
                        <div class="item name">
                          <div class="left">小系列名称</div>
                          <div class="right"><input type="text" placeholder="请输入小系列名称" v-model="editInfo.name"></div>
                        </div>

                          <div class="item desc">
                          <div class="left">小系列主图</div>
                          <div class="right"><CropperItem :img="editInfo.mainImg" :cropper="false" :url="uploadUrl" @fileChange="updateMain" @deleteImg="deleteMain()"></CropperItem></div>
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
// import CroppperList from '@/components/common/Cropper/cropper-list'
import CropperItem from '@/components/common/Cropper/cropper-item'
import store from 'store/admin'
import { toast } from '@/utils'
import { imgUploadApi } from '@/utils/cgiConfig'
// const uploadUrl = '/api/upload/image'
export default {
  // props: {
  //   bId: {
  //     type: Number,
  //     default: -1
  //   }
  // },
  computed: {
    editDiologShow: {
      get () {
        return store.state.lEditDiologShow
      },
      set (val) {
        store.commit('setLEditDiologShow', val)
      }
    },
    isEdit () {
      return store.state.isLEdit
    },
    editInfo: {
      get () {
        return store.state.lEditInfo
      },
      set (val) {
        store.commit('setLEditInfo', val)
      }
    }
  },
  methods: {
    deleteMain () {
      this.editInfo.mainImg = ''
      this.editInfo.mainImgThumb = ''
    },
    updateMain (data) {
      this.editInfo.mainImg = data.url
      this.editInfo.mainImgThumb = data.thumbUrl
    },
    checkEditInfo () {
      const checkList = [
        {
          key: 'name',
          type: 'string',
          value: '小系列名称不能为空'
        },
        {
          key: 'mainImg',
          type: 'string',
          value: '小系列主图不能为空'
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
      store.dispatch(this.isEdit ? 'editLseries' : 'addLseries', this.editInfo).then(() => {
        this.editDiologShow = false
      })
    }
  },
  components: {
    modal,
    // CroppperList,
    CropperItem
  },
  data () {
    return {
      descImg: '',
      uploadUrl: imgUploadApi.uploadImg,
      // product: {},
      dialogShow: this.show,
      isUpload: false,
      styleObj: {
        backgroundColor: '#EBEBEB',
        height: '300px'
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
