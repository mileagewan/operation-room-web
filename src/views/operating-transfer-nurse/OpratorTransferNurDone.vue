<template>
  <!-- 手术室接送护士 已完成任务 -->
  <template v-if="taskList.length">
    <DoneSummary :options="options" />
    <TaskList :taskList="taskList" />
  </template>
  <EmptyPage v-if="!taskList.length && !loading" message="暂无已完成任务" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import Request from '@/service/request';
import useTitleCount from '@/hooks/useTitleCount';
import { CurrentComplete } from '@/types/CurrentTaskViews';
import useTimeInterval from '@/hooks/useTimeInterval';
export default defineComponent({
  name: 'OpratorTransferNurDone',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount() as any;
    const { interval } = useTimeInterval();

    const options = reactive([
      {
        label: '送病人',
        value: 0,
      },
      {
        label: '接病人',
        value: 0,
      },
      {
        label: '准时率',
        value: 0,
        total: 0
      }
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
            options[2].value = data.onTimeNum;
            options[2].total = data.patientNum;
            taskList.value = data.completedOpTaskDetailsDTOList || [];
          } else {
            options[0].value = 0;
            options[1].value = 0;
            options[2].value = 0;
            options[2].total = 0;
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

    onMounted(() => {
      interval(getData);
    });

    return {
      loading,
      options,
      getData,
      taskList,
      onMounted
    };
  },
});
</script>

<style scoped></style>
