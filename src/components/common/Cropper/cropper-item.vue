<template>
    <div>
        <div class="item-container" style="width: 100px;height:100px;" :style="{backgroundImage: `url(${bgImg})`}">
            <input type="file" ref="input" class="file" @change="fileChange($event)">
            <div v-if="!bgImg" class="tip">
                <img src="./images/add.png" alt="">
                <span>{{ tip }}</span>
            </div>
        </div>
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
    <button class="btn" @click="cropperShow = false">
                        <span>取消</span>
                    </button>
    <button class="btn sure" @click="cropperConfirm">
                        <span>确定</span>
                    </button>
</template>
    </modal>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import modal from './modal'
export default {
  components: {
    VueCropper,
    modal
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '请选择图片'
    },
    cropper: {
      type: Boolean,
      default: true
    },
    fixed: {
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
  methods: {
    fileChange (event) {
      const files = (event.target || {}).files
      if (files) {
        const file = files[0]
        var reader = new FileReader()
        reader.onload = (e) => {
          if (this.cropper) {
            this.cropperImg = e.target.result
            this.cropperShow = true
            this.$refs.input.value = ''
          } else {
            this.bgImg = e.target.result
            this.$emit('choose', {
              base64: this.cropperImg,
              blob: file
            })
          }
        }
        reader.onerror = (e) => {
          this.$emit('choose', {
            base64: '',
            blob: file
          })
        }
        reader.readAsDataURL(file)
      }
    },
    cropperConfirm () {
      this.bgImg = this.previewImg
      this.cropperShow = false
      this.$refs.cropper.getCropBlob((data) => {
        this.previewImg = data
        this.$emit('choose', {
          base64: this.previewImg,
          blob: data
        })
      })
    },
    realTime (data) {
      this.$refs.cropper.getCropData((data) => {
        this.previewImg = data
      })
    }

  }

}
</script>

<style scoped>
.item-container {
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
    border: 1px dashed #d6d6d6;
    border-radius: 4px;
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

.btn {
    position: relative;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 12px;
    padding: 0 15px;
    height: 32px;
    line-height: 1.6;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, .015);
    box-shadow: 0 2px 0 rgba(0, 0, 0, .015);
    cursor: pointer;
    -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    font-size: 14px;
    border-radius: 4px;
    color: rgba(0, 0, 0, .65);
    background-color: #fff;
    border-color: #d9d9d9;
    outline: none;
}

.sure {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, .12);
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, .045);
    box-shadow: 0 2px 0 rgba(0, 0, 0, .045);
}

.preview {
    /* width: 200px;
  height: 200px; */
    flex: 1;
    margin-right: 20px;
}

.cropper {
    flex: 3
}
</style>
