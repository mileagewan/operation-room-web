<template>
  <!-- 手术室接送护士 已完成任务 -->
  <template v-if="taskList.length">
    <DoneSummary :options="options" />
    <TaskList :taskList="taskList" />
  </template>
  <EmptyPage v-else message="暂无已完成任务" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Request from '@/service/request';
export default defineComponent({
  name: 'OpratorTransferNurDone',
  setup() {
    const options = reactive([
      {
        label: '送病人',
        value: 0,
      },
      {
        label: '接病人',
        value: 0,
      },
    ]);
    const taskList: any = ref([]);
    const getData = () => {
      // eslint-disable-next-line no-undef
      return Request.xhr('queryCompletedTaskList').then((r: any) => {
        // console.log(r);
        const { data }: any = r;
        options[0].value = data.sendPatient;
        options[1].value = data.receivePatient;
        taskList.value = data.opTaskListingDTOList;
        // console.log(taskList);
      });
    };
    getData();
    return {
      options,
      getData,
      taskList,
    };
  },
});
</script>

<style scoped></style>
