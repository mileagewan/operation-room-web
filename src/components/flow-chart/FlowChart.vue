<template>
  <div class="flow-chart">
    <div :class="{
      'flow-chart-item': true,
      'is-current': item.current
    }" v-for="(item, i) in flowDatas" :key="i">
      <span class="flow-chart-circle">
        <van-icon :name="item.icon" />
        <span class="flow-chart-line"></span>
      </span>
      <div class="flow-chart-item_title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { FlowData } from '@/utils/mock-test-data'
export default defineComponent({
  name: 'FlowChart',
  props: {
    flowData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  setup() {
    const flowDatas = reactive(FlowData)
    return {
      flowDatas,
    }
  },
})
</script>

<style scoped></style>
