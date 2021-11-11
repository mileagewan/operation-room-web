<template>
  <!-- 病区护士 已完成任务 -->
  <template v-if="taskList.length">
    <DoneSummary :options="options" />
    <TaskList :taskList="taskList" />
  </template>
  <EmptyPage v-if="!taskList.length && !loading" message="暂无已完成任务" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
import Request from '@/service/request';
import useTitleCount from '@/utils/useTitleCount';

export default defineComponent({
  name: 'WardNurDone',
  setup() {
    const { updateTitleCount } = useTitleCount() as any;
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
    const loading = ref(false);
    const getData = () => {
      loading.value = true;
      return Request.xhr('queryCompletedTaskList')
        .then((r: CurrentTaskViews) => {
          // console.log(r);
          if (r.code === 200) {
            const { data }: any = r;
            options[0].value = data.sendPatient;
            options[1].value = data.receivePatient;
            taskList.value = data.opTaskListingDTOList;
          } else {
            options[0].value = 0;
            options[1].value = 0;
            taskList.value = [];
          }
          updateTitleCount(taskList.value.length);
        })
        .finally(() => {
          loading.value = false;
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
      loading,
      options,
      taskList,
      getData,
    };
  },
});
</script>

<style scoped></style>
