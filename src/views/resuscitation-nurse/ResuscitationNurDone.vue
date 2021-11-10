<template>
  <!-- 复苏室护士 已完成任务 -->
  <DoneSummary :options="options" v-if="taskList.length"/>
  <TaskList :taskList="taskList" v-if="taskList.length"/>
  <EmptyPage message="当前暂无完成任务" v-if="!taskList.length"/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'ResuscitationNurDone',
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
    taskList.value = []
    const getData = (): Promise<any> => {
      return new Promise<any>(resolve => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    }
    return {
      options,
      taskList,
      getData
    };
  },
});
</script>

<style scoped></style>
