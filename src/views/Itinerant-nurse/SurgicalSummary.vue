<template>
  <div class="surgical-summary">
    <div class="surgical-summary-item" v-for="i in 10" :key="i">
      <div class="surgical-summary-item_title">
        手术间01
      </div>
      <div class="surgical-summary-item_status">
        <van-tag round
                 class="opration-tag"
                 type="primary">
          急诊
        </van-tag>
      </div>
      <div class="surgical-summary-item_number">
        <span class="surgical-summary-item_number_status">2</span>
        <span class="surgical-summary-item_number_count">/5</span>
      </div>
      <div class="surgical-summary-item_label">手术状态</div>
      <div class="surgical-summary-item_msg">正常</div>
    </div>
  </div>
  <div class="refresh-option">
    <van-icon name="replay" />
    <div class="refresh-option-title">手术更新</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SurgicalSummary',
  setup() {
    return {}
  }
})
</script>
