<template>
  <div class="flow-chart">
    <div
      class="flow-chart-item"
      v-for="(item, i) in flowDatas"
      :key="i"
      :class="{
        'is-current': item.current,
        'is-todo': isTodo(i),
      }"
    >
      <span class="flow-chart-circle">
        <van-icon :name="item.icon" />
        <span class="flow-chart-line"></span>
      </span>
      <div class="flow-chart-item_title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { FlowData } from '@/utils/mock-test-data';
import { findIndex } from 'lodash';
export default defineComponent({
  name: 'FlowChart',
  props: {
    flowData: {
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const { flowData } = props as any;
    const flowDatas = reactive(flowData.length ? flowData : FlowData);
    const currentIndex = findIndex(flowDatas, { current: true });
    return {
      flowDatas,
      currentIndex,
    };
  },
  methods: {
    isTodo(i: number) {
      return i > this.currentIndex;
    },
  },
});
</script>

<style scoped></style>
