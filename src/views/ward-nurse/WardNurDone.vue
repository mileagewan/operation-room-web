<template>
  <!-- 病区护士 已完成任务 -->
  <DoneSummary :options="options" />
  <TaskList :taskList="taskList" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue';
export default defineComponent({
  name: 'WardNurDone',
  setup() {
    // TODO 页面请求数据，并封装好DoneSummary所需要的options数据
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
    const taskList: any = ref([]);
    taskList.value = new Array(10).fill('').map((item, index) => {
      return {
        name: 'user' + (index + 1),
      };
    });
    const hospitalCode = ref('');
    const { appContext }: any = getCurrentInstance();
    const emitter: any = appContext.config.globalProperties.emitter;
    emitter.on('scan-code-success', (data: any) => {
      console.log(data);
      if (data) {
        // TODO 过滤列表
        hospitalCode.value = data;
      }
    });
    return {
      options,
      taskList,
    };
  },
});
</script>

<style scoped></style>
