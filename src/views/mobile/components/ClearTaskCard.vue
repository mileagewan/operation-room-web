<template>
  <div class="clear-task-card">
    <div class="card-title">
      <span>09:20清洁任务</span>
      <span>二区域-手术间05</span>
    </div>
    <div class="item-warp">
      <div class="item">
        <div class="title">手术名称</div>
        <div class="text">10月20日(周五) 08:00-09:00 胸腔镜下肺大泡切除术</div>
      </div>
      <div class="item">
        <div class="title">任务发起人</div>
        <div class="text">林宇</div>
      </div>
      <div class="item">
        <div class="title">清洁护工</div>
        <div class="text">刘爱莲</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ClearTaskCard',
  setup() {
    const data = ref(false)
    return {
      data
    }
  },
})
</script>
<style lang="scss" scoped>
.clear-task-card {
  .card-title {
    span {
      height: 48px;
      font-size: 36px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #000000;
      line-height: 48px;
    }
  }
  .item-warp {
    .item {
      .title {
      }
      .text {
      }
    }
  }
}
</style>
