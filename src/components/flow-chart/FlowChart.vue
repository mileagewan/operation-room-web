<template>
  <div class="flow-chart">
    <div
      class="flow-chart-item"
      v-for="(item, i) in flowDatas"
      :key="i"
      :class="{
        'is-current': item.code === currentCode,
        'is-todo': isTodo(i),
      }"
    >
      <span class="flow-chart-line">
        <IconFont icon="icon-jindujiantou" />
      </span>
      <span class="flow-chart-circle">
        <IconFont :icon="iconMap[i + 1]" />
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
    currentCode: {
      type: String,
      default: '',
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
  data() {
    return {
      iconMap: {
        1: 'icon-kaishi', // 接单
        2: 'icon-kaishi', // 开始
        3: 'icon-jieshu', // 结束
        4: 'icon-shoushukaishi', // 手术开始
        5: 'icon-shoushujieshu', // 手术完成
        6: 'icon-saomajiaojie', // 扫码交接
        7: 'icon-zhuanchuhedui', // 转出核对
        8: 'icon-hedui', // 三方确认
        9: 'icon-mazui', // 麻醉
        10: 'icon-suxing', // 患者苏醒
      },
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
