<template>
  <!-- 病区护士 已完成任务 -->
  <DoneSummary :options="options" />
  <TaskList :taskList="taskList" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue';
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
import Request from '@/service/request'
import { testdata } from '@/utils/mock-test-data';

export default defineComponent({
  name: 'WardNurDone',
  setup() {
    // TODO 页面请求数据，并封装好DoneSummary所需要的options数据
    const options:any[] = reactive([
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
    const getData = () => {
      taskList.value = testdata;
      console.log(taskList);

      // eslint-disable-next-line no-undef
      Request.xhr('queryCompletedTaskList').then((r: CurrentTaskViews) => {
        console.log(r);
        const { data }:any = r
        options[0].value = data.sendPatient
        options[1].value = data.receivePatient
        taskList.value = data.opTaskListingDTOList
      });
    };
    getData()

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
      getData
    };
  },
});
</script>

<style scoped></style>
