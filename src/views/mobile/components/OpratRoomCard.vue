<template>
  <div class="operat-room-card">
    <div class="title-warp">
      <div class="title">
        <span class="time">10月20日(周五) 08:00-09:00</span>
        <span class="text">胸腔镜下肺大泡切除术</span>
      </div>
      <div class="state-bar"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OpratRoomCard',
  setup() {
    const data = {}
  },
})
</script>
<style lang="scss" scoped>
.operat-room-card {
  .title-warp {
    display: flex;
    .title {
      display: flex;
      flex-direction: column;
      font-size: 36px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #000000;
    }
  }
}
</style>
