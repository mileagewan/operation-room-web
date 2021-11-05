<template>
  <div class="patient-detail">
    <div class="patient-name">
      <div class="patient-name-left">
        <span class="patient-pesonal-name">{{ option.name }}</span>
        <span class="patient-pesonal-sex">{{ option.sex }}</span>
        <span class="patient-pesonal-old">{{ option.age }}</span>
      </div>
      <van-tag round class="status" :class="[statusClass]" type="primary">
        {{ $filters.status(option.status) }}
      </van-tag>
    </div>
    <div class="patient-label">
      <span class="patient-label-title">{{ option.room }}</span>
      <van-tag
        round
        class="opration-tag"
        type="primary"
        :class="[option.type === 2 ? 'emergency' : 'normal']"
        >{{ option.type === 2 ? '急诊' : '平珍' }}</van-tag
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PatientDetail',
  props: {
    option: {
      type: Object,
      default: () => ({
        name: '四个名字',
        sex: '男',
        age: '99',
        status: 16,
        type: 2,
        room: '手术-01间-01台',
      }),
    },
  },
  computed: {
    statusClass(): string {
      const { status } = this.option;
      if (!status) {
        return '';
      }
      // 未开始
      const style1: number[] = [2];
      if (style1.includes(status)) {
        return 'before';
      }
      // 进行中
      const style2: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      if (style2.includes(status)) {
        return 'progress';
      }
      // 结束
      const style3: number[] = [16, -99];
      if (style3.includes(status)) {
        return 'end';
      }
      return '';
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
