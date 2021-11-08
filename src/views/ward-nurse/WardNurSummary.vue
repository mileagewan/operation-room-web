<template>
  <!-- 任务汇总 -->
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text=""
    @load="getData"
    class="page-padding list"
  >
    <van-cell v-for="(item, index) in list" :key="index">
      <ExpandCard />
    </van-cell>
  </van-list>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Request from '@/service/request';
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
export default defineComponent({
  name: 'WardNurSummary',
  setup() {
    const loading = ref(false);
    const finished = ref(true);
    const testData = new Array(10).fill('').map((item, index) => {
      return {
        name: 'user' + (index + 1),
      };
    });
    const list: any[] = reactive(testData);
    const getData = () => {
      // eslint-disable-next-line no-undef
      Request.xhr('querySummaryTaskList').then((r: CurrentTaskViews) => {
        // const { code, data } = r;
        // if (code === 200) {
        //   const taskViews = data.map((d) => {
        //     return {
        //       ...d,
        //       taskList: formatTask(data, taskList)
        //     }
        //   })
        // }
        console.log(r);
        // taskViewsList.value = testdata.map((d) => {
        //   return {
        //     ...d,
        //     taskList: formatTask(d, taskList)
        //   }
        // }) as any;
      });
    };
    getData();
    // console.log(list);
    return {
      loading,
      finished,
      list,
      getData,
    };
  },
});
</script>

<style scoped></style>
