<template>
  <div>test vant3</div>
  <van-button type="primary" @click="showDialog">主要按钮</van-button>
  <van-dialog v-model:show="show" title="标题" show-cancel-button>
    相关的npm包数量一直在增长 JavaScript高级程序设计 JavaScript权威指南
    你不知道的JavaScript 以下课程十分推荐想往前端架构师方向
  </van-dialog>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const show = ref(false)
    const showDialog = (): void => {
      show.value = true
    }
    return { show, showDialog }
  }
})
</script>
