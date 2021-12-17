<template>
  <!-- 转运护士 已完成任务 -->
  <template v-if="taskList.length">
    <DoneSummary :options="options" />
    <TaskList :taskList="taskList" />
  </template>
  <EmptyPage v-if="!taskList.length && !loading" message="暂无已完成任务" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Request from '@/service/request';
import useTitleCount from '@/utils/useTitleCount';
import { CurrentComplete } from '@/types/CurrentTaskViews';
export default defineComponent({
  name: 'TransferNurDone',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount() as any;
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
    const loading = ref(false);
    const getData = () => {
      loading.value = true;
      return Request.xhr('queryCompletedOpTask')
        .then((r: CurrentComplete) => {
          if (r.code === 200) {
            const { data }: any = r;
            options[0].value = data.sendPatientNum;
            options[1].value = data.receivePatientNum;
            taskList.value = data.completedOpTaskDetailsDTOList || [];
          } else {
            options[0].value = 0;
            options[1].value = 0;
            taskList.value = [];
          }
          updateTitleCount(taskList.value.length);
          updateCardCacheData(taskList.value);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    getData();
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
