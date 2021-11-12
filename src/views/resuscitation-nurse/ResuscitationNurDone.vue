<template>
  <!-- 复苏室护士 已完成任务 -->
  <DoneSummary :options="options" v-if="taskList.length"/>
  <TaskList :taskList="taskList" v-if="taskList.length"/>
  <EmptyPage v-if="!taskList.length && !loading" message="暂无已完成任务" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Request from '@/service/request'
import useTitleCount from '@/utils/useTitleCount';
export default defineComponent({
  name: 'ResuscitationNurDone',
  setup() {
    const { updateTitleCount } = useTitleCount();

    // TODO 页面请求数据，并封装好DoneSummary所需要的options数据
    const options = reactive([
      {
        label: '复苏病人',
        value: 0,
      },
      {
        label: '准时率',
        value: 0,
      }
    ]);
    const taskList: any = ref([]);
    const loading = ref(false)
    const getData = () => {
      loading.value = true;
      return Request.xhr('queryCompletedTaskList')
        .then((r: any) => {
          // console.log(r);
          if (r.code === 200) {
            const { data }: any = r;
            options[0].value = data.patientNum;
            options[1].value = data.onTimeRate;
            taskList.value = data.opTaskListingDTOList;
          } else {
            options[0].value = 0;
            options[1].value = 0;
            taskList.value = [];
          }
          updateTitleCount(taskList.value.length)
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
      getData
    };
  },
});
</script>

<style scoped></style>
