<template>
    <div style="width: 100%;height: 100%;">
        <div class="item-container" :style="{backgroundImage: `url(${img})`, ...styleObj}">
            <input type="file" @mouseenter="showMask()" ref="input" class="file" @change="fileChange($event)">
            <div v-if="!img" class="tip">
                <img :src="addIcon" alt="">
                <span>{{ tip }}</span>
            </div>
            <div class="img-mask" v-if="showImgMask"  @mouseleave="hideMask()" @click="chooseFile()">
              <i @click.stop="preview($event)" title="预览"><img class="icon" src="/static/icon/preview.png" alt=""></i>
              <i @click.stop="showConfirm=true" title="删除"><img class="icon" src="/static/icon/delete.png" alt=""></i>
            </div>
        </div>
        <modal :visible.sync="showBigImg" class="showBigImg" @close="showBigImg=false">
          <template v-slot:body>
            <div style="width:500px;height:400px;display:flex;">
              <img :src="bgImg" style="width: 100%;"  alt="">
            </div>

          </template>
        </modal>
        <modal :mask-closable="false" :visible.sync="cropperShow" title="裁剪图片">
            <template v-slot:body>
                <div style="width:500px;height:400px;display:flex;">
                  <div class="preview">
                    <img :src="previewImg" style="width: 100%;">
                  </div>

                  <vue-cropper
                    class="cropper"
                    ref="cropper"
                    autoCropHeight="100%"
                    @realTime="realTime"
                    :fixed-number="[width,height]"
                    :full="true"
                    :img="cropperImg"
                    :centerBox="true"
                    :output-size="outputSize"
                    :auto-crop="true"
                    :fixed="fixed"
                    :fixedNumber="fixedNumber"
                  />
                </div>
            </template>

            <template v-slot:footer>
              <button class="btn" @click="hideCropper">
                                  <span>取消</span>
                              </button>
              <button class="btn success" @click="cropperConfirm">
                                <span>确定</span>
                            </button>
            </template>
    </modal>

    <Confirm :show="showConfirm" @close="showConfirm=false" @ok="sure" :content="confirmContent"></Confirm>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import modal from '../Modal'
import Confirm from '@/components/common/Confirm'
import { imgUploadApi } from '@/utils/cgiConfig'
export default {
  components: {
    VueCropper,
    Confirm,
    modal
  },
  props: {
    styleObj: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: Number,
      default: -1
    },
    url: {
      type: Object,
      default: () => imgUploadApi.upload
    },
    img: {
      default: ''
    },
    addIcon: {
      type: String,
      default: '/static/icon/add.png'
    },
    tip: {
      type: String,
      default: ''
    },
    cropper: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    isImg: {
      type: Boolean,
      default: true
    },
    fixedNumber: {
      type: Array,
      default: () => [1, 1]
    }
  },
  data () {
    return {
      confirmContent: `确定要删除此张图片吗？`,
      showConfirm: false,
      host: 'http://localhost:3433',
      originPath: this.isImg ? '/api/download/image/origin/' : '/api/download/file/origin/',
      thumbPath: this.isImg ? '/api/download/image/thumbnail/' : '',
      isMaskShow: false,
      showBigImg: false,
      cropperImg: this.img || '',
      bgImg: this.img || '',
      cropperShow: false,
      outputSize: 0.8,
      width: 400,
      height: 300,
      cropperInfo: {
        width: '100%',
        heigth: '100%'
      },
      previewImg: ''
    }
  },
  watch: {
    img (val) {
      this.cropperImg = val
      this.bgImg = val
    }
  },
  computed: {
    showImgMask () {
      return this.isMaskShow && this.img
    }
  },
  methods: {
    sure () {
      this.deleteImg()
    },
    emitChange (event, data) {
      if (event === 'fileChange') {
        const fmData = new FormData()
        fmData.append('file', data.blob, 'a.jpg')
        this.$ajax(this.url, fmData).then(ret => {
          this.$emit(event, Object.assign(ret, {
            url: this.host + this.originPath + ret.filename,
            thumbUrl: this.host + this.thumbPath + ret.filename
          }))
        })
      } else {
        this.$emit(event, data)
      }
    },
    preview (event) {
      this.showBigImg = true
    },
    deleteImg (event) {
      this.emitChange('deleteImg', { img: this.bgImg, id: this.id })
    },
    chooseFile () {
      this.$refs.input.click()
      this.hideMask()
    },
    showMask () {
      if (this.img) {
        this.isMaskShow = true
      }
    },
    hideMask () {
      if (this.img) {
        this.isMaskShow = false
      }
    },
    fileChange (event) {
      const files = (event.target || {}).files
      if (files) {
        const file = files[0]
        var reader = new FileReader()
        reader.onload = (e) => {
          this.cropperImg = e.target.result
          if (this.cropper) {
            this.cropperShow = true
          } else {
            this.bgImg = e.target.result
            this.emitChange('fileChange', {
              base64: this.cropperImg,
              blob: file
            })
          }
          this.$refs.input.value = ''
        }
        reader.onerror = (e) => {
          this.emitChange('fileChange', {
            base64: '',
            blob: file
          })
        }
        reader.readAsDataURL(file)
      }
    },
    hideCropper () {
      this.hideMask()
      this.cropperShow = false
    },
    getBlob () {
      return new Promise((resolve, reject) => {
        this.$refs.cropper.getCropBlob((blob) => {
          resolve(blob)
        })
      })
    },
    getBase64 () {
      return new Promise((resolve, reject) => {
        this.$refs.cropper.getCropData((base64) => {
          resolve(base64)
        })
      })
    },
    cropperConfirm () {
      this.hideMask()
      this.bgImg = this.previewImg
      this.cropperShow = false
      const promiseList = [this.getBlob(), this.getBase64()]
      Promise.all(promiseList).then(data => {
        this.emitChange('fileChange', {
          id: this.id,
          base64: data[1],
          blob: data[0]
        })
      })
    },
    realTime (data) {
      this.getBase64().then(base64 => {
        this.previewImg = base64
      })
    }

  }

}
</script>

<style scoped>
.item-container {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100%;
    /* min-height: 100px; */
    /* border: 1px dashed #d6d6d6; */
    /* border-radius: 6px; */
    color: #d6d6d6;
    background-color: #fafafa;
    -webkit-transition: border-color .3s ease;
    transition: border-color .3s ease;
    background-repeat: no-repeat;
    background-size: cover;
    /* background-image: url('./images/add.png') no-repeat; */
    overflow: hidden;
}

.file {
    cursor: pointer;
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
}

.tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.preview {
    /* width: 200px;
  height: 200px; */
    flex: 1;
    margin-right: 20px;
}
.icon {
  width: 14px;
  height: 14px;
}

.cropper {
    flex: 3
}

.img-mask {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* opacity: 0; */
    background: rgba(0,0,0,.274);
    -webkit-transition: all .3s;
    transition: all .3s;
    color: #fff;
    font-size: 22px;
}
.img-mask i {
  padding: 2px;
}
</style>
