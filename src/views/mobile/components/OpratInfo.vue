<template>
  <div class="oprat-info-warp">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, useSlots } from "vue";

export default defineComponent({
  name: "OpratInfo",
  setup() {
    const slotTest = !!useSlots().header;
    return {
      slotTest,
    };
  },
});
</script>
<style lang="scss" scoped>
.oprat-info-warp {
  :deep(.row) {
    display: flex;
    line-height: 1;
    &:nth-child(n + 2) {
      .item {
        width: 312px;
        overflow: hidden;
      }
    }
    .item {
      padding: 12px 0;
      display: flex;
      .title {
        display: inline-block;
        width: 98px;
        height: 24px;
        font-size: 24px;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
        margin-right: 24px;
      }
      .text {
        // height: 24px;
        font-size: 24px;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
    }
    &:not(:nth-child(1)) {
      .item .text {
        max-width: 190px;
      }
    }
  }
}
</style>
