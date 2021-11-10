<template>
  <!-- 病区护士 已完成任务 -->
  <template v-if="taskList.length">
    <DoneSummary :options="options" />
    <TaskList :taskList="taskList" />
  </template>
  <EmptyPage v-else message="暂无已完成任务" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
import Request from '@/service/request';

export default defineComponent({
  name: 'WardNurDone',
  setup() {
    // TODO 页面请求数据，并封装好DoneSummary所需要的options数据
    const options: any[] = reactive([
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
      Request.xhr('queryCompletedTaskList').then((r: CurrentTaskViews) => {
        // console.log(r);
        const { data }: any = r;
        options[0].value = data.sendPatient;
        options[1].value = data.receivePatient;
        taskList.value = data.opTaskListingDTOList;
      });
    };
    getData();

    // const hospitalCode = ref('');
    // const { appContext }: any = getCurrentInstance();
    // const emitter: any = appContext.config.globalProperties.emitter;
    // emitter.on('scan-code-success', (data: any) => {
    //   console.log(data);
    //   if (data) {
    //     // TODO 过滤列表
    //     hospitalCode.value = data;
    //   }
    // });
    return {
      options,
      taskList,
      getData,
    };
  },
});
</script>

<style scoped></style>
