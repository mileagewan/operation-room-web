<template>
  <!-- 转运护士 已完成任务 -->
  <DoneSummary :options="options" />
  <TaskList :taskList="taskList" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Request from '@/service/request';
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
export default defineComponent({
  name: 'TransferNurDone',
  setup() {
    // TODO 页面请求数据，并封装好DoneSummary所需要的options数据
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
      Request.xhr('queryCompletedTaskList').then((r: any) => {
        console.log(r);
        const { data }: any = r;
        options[0].value = data.sendPatient
        options[1].value = data.receivePatient
        taskList.value = data.opTaskListingDTOList;
        console.log(taskList);
      });
    };
    getData();
    return {
      options,
      taskList,
      getData,
    };
  },
});
</script>

<style scoped></style>
