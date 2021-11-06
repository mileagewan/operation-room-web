<template>
  <van-tag round class="status" :class="[statusClass]" type="primary">
    {{ $filters.status(code) }}
  </van-tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TagStatus',
  props: {
    code: {
      type: String,
      default: '',
    },
  },
  computed: {
    statusClass(): string {
      const status: string = this.code;
      if (!status) {
        return '';
      }
      // 未开始
      const style1: string[] = ['2'];
      if (style1.includes(status)) {
        return 'before';
      }
      // 进行中
      const style2: string[] = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
      ];
      if (style2.includes(status)) {
        return 'progress';
      }
      // 结束
      const style3: string[] = ['16', '-99'];
      if (style3.includes(status)) {
        return 'end';
      }
      return '';
    },
  },
});
</script>

<style lang="scss" scoped>
.status {
  height: 40px;
  padding: 0 12px;
  border-radius: 20px;
  font-size: 24px;
  &.progress {
    color: #3bdc37;
    background: #e5ffe6;
  }
  &.before {
    color: #5bc7f9;
    background: #defaff;
  }
  &.end {
    color: #ddd;
    background: #fafafa;
  }
}
</style>
