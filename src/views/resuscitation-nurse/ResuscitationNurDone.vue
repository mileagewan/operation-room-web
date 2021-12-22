<template>
  <!-- 复苏室护士 已完成任务 -->
  <DoneSummary :options="options" v-if="taskList.length"/>
  <TaskList :taskList="taskList" v-if="taskList.length"/>
  <EmptyPage v-if="!taskList.length && !loading" message="暂无已完成任务" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import Request from '@/service/request';
import useTitleCount from '@/utils/useTitleCount';
import useTimeInterval from '@/mixins/useTimeInterval';
export default defineComponent({
  name: 'ResuscitationNurDone',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount();
    const { interval } = useTimeInterval();

    // TODO 页面请求数据，并封装好DoneSummary所需要的options数据
    const options = reactive([
      {
        label: '复苏病人',
        value: 0,
      },
      {
        label: '准时率',
        value: 0,
        total: 0,
      }
    ]);
    const taskList: any = ref([]);
    const loading = ref(false);
    const getData = () => {
      loading.value = true;
      return Request.xhr('queryCompletedOpTask')
        .then((r: any) => {
          // console.log(r);
          if (r.code === 200 && r.data?.completedOpTaskDetailsDTOList) {
            const { data }: any = r;
            options[0].value = data.patientNum;
            options[1].value = data.onTimeNum;
            options[1].total = data.patientNum;
            taskList.value = data.completedOpTaskDetailsDTOList;
          } else {
            options[0].value = 0;
            options[1].value = 0;
            options[1].total = 0;
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
      taskList,
      getData,
      onMounted,
    };
  },
});
</script>

<style scoped></style>
