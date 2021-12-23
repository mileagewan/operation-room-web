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
        <!-- <IconFont icon="icon-jindujiantou" /> -->
      </span>
      <span class="flow-chart-circle">
        <IconFont :icon="item.icon" />
      </span>
      <div class="flow-chart-item_title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { findIndex, isNumber } from 'lodash';
import { iconMap as ICON_MAPS } from '@/components/flow-chart/iconMap';

export default defineComponent({
  name: 'FlowChart',
  props: {
    flowData: {
      default() {
        return [];
      },
    },
    currentCode: {
      type: [Number, String],
      default: null,
    },
  },
  setup(props) {
    const { flowData, currentCode } = props as any;
    const iconMap: any = {
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
    };
    const flowMap: any = {
      1: '接单',
      2: '开始',
      3: '结束',
      4: '手术开始',
      5: '手术完成',
      6: '扫码交接',
      7: '转出核对',
      8: '三方确认',
      9: '麻醉',
      10: '患者苏醒',
    };

    let flowDatas = reactive([]);
    flowDatas = flowData.map((item: any) => {
      if (isNumber(item)) {
        return {
          code: item,
          title: flowMap[item],
          icon: iconMap[item],
        };
      } else if (!(item?.icon)) {
        return {
          ...item,
          icon: ICON_MAPS.get(item.code.trim()) || 'icon-kaishi'
        };
      }
      return item;
    });
    const currentIndex = findIndex(flowDatas, { code: currentCode });
    return {
      flowDatas,
      currentIndex,
    };
  },
  data() {
    return {};
  },
  methods: {
    isTodo(i: number) {
      return i > this.currentIndex;
    },
  },
});
</script>

<style scoped></style>
