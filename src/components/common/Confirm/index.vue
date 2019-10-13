<template>
 <modal :visible.sync="show" :title="title" :mask-closable="false" @close="close()">
          <template v-slot:body>
            <div style="width:300px;display:flex;">
              {{content}}
            </div>
            <slot></slot>
          </template>
          <template v-slot:footer>
            <button class="btn" @click="close">取消</button>
            <button class="btn success" @click="sure">确定</button>
          </template>
        </modal>
</template>

<script>
import modal from '@/components/common/Modal'
export default {
  props: {
    title: {
      type: String,
      default: '确定删除吗'
    },
    show: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ''
    }
  },
  components: {
    modal
  },
  methods: {
    close () {
      this.$emit('close')
    },
    sure () {
      this.$emit('ok')
    }
  }
}
</script>
