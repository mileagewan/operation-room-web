<template>
  <div class="clear-completed-card">
    <ClearTaskCard :data="clearTaskCardData" />
    <div class="btn-group">
      <van-button
        type="primary"
        color="linear-gradient(47deg,#00d6fa 8%, #00acf2 90%)"
        @click="btnClick"
      >已完成</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ClearTaskCard from './ClearTaskCard.vue'

export default defineComponent({
  name: 'ClearCompletedCard',
  components: {
    ClearTaskCard
  },
  emits: ['btnclick'],
  props: {
    data: {
      type: Object,
      default: () => { }
    }
  },
  setup(props, ctx) {
    const clearTaskCardData = ref<any>(props.data)
    const btnClick = () => {
      ctx.emit('btnclick', clearTaskCardData.value.id)
    }
    return {
      btnClick,
      clearTaskCardData
    }
  },
})
</script>
<style lang="scss" scoped>
.clear-completed-card {
  background: #ffffff;
  border-radius: 0px 0px 12px 12px;
  padding-bottom: 24px;
  .btn-group {
    padding: 24px;
    text-align: right;
    :deep(.van-button) {
      width: 300px;
      height: 90px;
      border-radius: 46px;
      box-shadow: 0px 10px 20px 0px #9dd9ff;
    }
  }
}
</style>
