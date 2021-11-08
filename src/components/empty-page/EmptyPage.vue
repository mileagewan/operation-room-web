<template>
  <div class="empty-page">
    <div>
      <div class="image_img"></div>
      <span class="msg">{{msg}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'EmptyPage',
  props: {
    message: {
      type: String,
      default: '当前暂无任务'
    }
  },
  setup(props) {
    const msg = ref(props.message)
    return {
      msg
    }
  }
})
</script>

<style scoped>

</style>
