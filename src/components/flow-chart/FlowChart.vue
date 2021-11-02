<template>
  <div class="flow-chart">
    <div class="flow-chart-item" v-for="(item, i) in flowDatas" :key="i">
      <span class="flow-chart-circle">
        <van-icon :name="item.icon" />
        <span class="flow-chart-line"></span>
      </span>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
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
