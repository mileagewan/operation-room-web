<template>
  <div class="clear-task-card">
    <div class="card-title">
      <span>09:20清洁任务</span>
      <span>二区域-手术间05</span>
    </div>
    <div class="item-warp">
      <div class="item">
        <div class="title">手术名称</div>
        <div class="text">
          <span>10月20日(周五) 08:00-09:00</span>
          <span>胸腔镜下肺大泡切除术</span>
        </div>
      </div>
      <div class="item">
        <div class="title">任务发起人</div>
        <div class="text">林宇</div>
      </div>
      <div class="item">
        <div class="title">清洁护工</div>
        <div class="text">刘爱莲</div>
      </div>
      <div class="item">
        <div class="title">完成时间</div>
        <div class="text">09:00</div>
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
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 12px 24px 0px rgba(217, 220, 221, 0.5);
  padding: 30px 24px 24px;
  .card-title {
    padding-bottom: 27px;
    span {
      height: 48px;
      font-size: 36px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #000000;
      line-height: 48px;
      & + span {
        margin-left: 24px;
      }
    }
  }
  .item-warp {
    .item {
      display: flex;
      padding: 12px 0;
      .title {
        width: 120px;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #999999;
      }
      .text {
        margin-left: 89px;
        display: flex;
        flex-direction: column;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
</style>
