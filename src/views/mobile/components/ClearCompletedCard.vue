<template>
  <div class="clear-completed-card">
    <ClearTaskCard />
    <div class="btn-group">
      <van-button type="primary" color="linear-gradient(47deg,#00d6fa 8%, #00acf2 90%)">已完成</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ClearTaskCard from './ClearTaskCard.vue'

export default defineComponent({
  name: 'ClearCompletedCard',
  components: {
    ClearTaskCard
  },
  setup() {

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
