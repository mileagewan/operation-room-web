<template>
  <!-- 任务汇总 -->
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text=""
    @load="getData"
    class="page-padding list"
  >
    <van-cell v-for="(task, index) in list" :key="index">
      <ExpandCard
        :option="{
          status: task.opInfo.opSectionCode,
          name: task.patient.name,
          sex: task.patient.sex,
          age: task.age,
          type: task.opInfo.type,
          room: task.opInfo.oproomName,
        }"
      >
        <KeyValue
          v-for="(item, i) in task.infoItems"
          :value="item.value"
          :danger="item.danger"
          :key="i"
        >
          <template #label>
            {{ item.label }}
          </template>
        </KeyValue>
      </ExpandCard>
    </van-cell>
  </van-list>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Request from '@/service/request';
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
import useTaskMixins, {
  anesthesiaDicCode,
  anesthetistName,
  beforeDiseaseName,
  circulatingNurseName,
  departmentName,
  hospitalCode,
  infectType,
  opInfoCode,
  opInfoName,
  surgeonName,
} from '../../utils/task-mixins';

export default defineComponent({
  name: 'WardNurSummary',
  setup() {
    const loading = ref(false);
    const finished = ref(true);
    const { formatTask } = useTaskMixins();
    const infoItems = [
      opInfoCode(),
      hospitalCode(),
      departmentName(),
      surgeonName(),
      circulatingNurseName(),
      anesthetistName(),
      anesthesiaDicCode(),
      infectType(),
      opInfoName(),
      beforeDiseaseName(),
    ];
    // const testData = new Array(10).fill('').map((item, index) => {
    //   return {
    //     name: 'user' + (index + 1),
    //   };
    // });
    const list: any = ref([]);
    const getData = () => {
      // list = testdata.map((d: any) => {
      //   return {
      //     ...d,
      //     infoItems: formatTask(d, infoItems),
      //   };
      // });
      // console.log(list);

      // eslint-disable-next-line no-undef
      Request.xhr('querySummaryTaskList').then((r: CurrentTaskViews) => {
        // console.log(r);
        if (r.data) {
          list.value = r.data.map((d: any) => {
            return {
              ...d,
              infoItems: formatTask(d, infoItems),
            };
          });
          // console.log(list);
        }
        // TODO 数据list赋值处理
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
