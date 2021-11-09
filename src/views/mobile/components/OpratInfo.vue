<template>
  <div class="oprat-info-warp">
    <!-- <div class="info-content info-left">
      <slot name="left-content" />
    </div>
    <div class="info-content info-right">
      <slot name="right-content" />
    </div> -->
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, useSlots } from 'vue'

export default defineComponent({
  name: 'OpratInfo',
  setup() {
    const slotTest = !!useSlots().header;
    return {
      slotTest
    }
  },
})
</script>
<style lang="scss" scoped>
.oprat-info-warp {
  // display: flex;
  .info-content {
    &.info-right {
      margin-left: 160px;
    }
    :deep(.item) {
      padding: 12px 0;
      .title {
        display: inline-block;
        width: 96px;
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
        margin-right: 24px;
      }
      .text {
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
    }
  }
  :deep(.row){
    display: flex;
    .item{
      padding: 12px 0;
      .title {
        display: inline-block;
        width: 96px;
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
        margin-right: 24px;
      }
      .text {
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
      + .item{
        margin-left: 160px;
      }
    }
  }
}
</style>
