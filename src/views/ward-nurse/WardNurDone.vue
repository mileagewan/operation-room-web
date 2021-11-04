<template>
  <!-- 已完成任务 -->
  <div>
    <DoneSummary :options="options" />
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'WardNurDone',
  setup() {
    const options = reactive([
      {
        label: '送病人',
        value: 4,
      },
      {
        label: '接病人',
        value: 4,
      },
    ]);
    return {
      options,
    };
  },
});
</script>

<style scoped></style>
