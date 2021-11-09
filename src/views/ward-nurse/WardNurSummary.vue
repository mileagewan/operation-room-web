<template>
  <!-- 任务汇总 -->
  <EmptyPage message="暂无手术任务" v-if="!taskList.length" />
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text=""
    @load="getData"
    class="page-padding list"
  >
    <van-cell v-for="(task, index) in taskList" :key="index">
      <ExpandCard
        :option="{
          status: task.opInfo.opSectionCode,
          name: task.patient.name,
          sex: task.patient.sex,
          age: task.patient.age,
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
    const taskList: any = ref([]);
    const getData = () => {
      Request.xhr('querySummaryTaskList').then((r: CurrentTaskViews) => {
        // console.log(r);
        if (r.data) {
          taskList.value = r.data.map((d: any) => {
            return {
              ...d,
              infoItems: formatTask(d, infoItems),
            };
          });
          // console.log(taskList);
        }
      });
    };
    getData();

    return {
      loading,
      finished,
      taskList,
      getData,
    };
  },
});
</script>

<style scoped></style>
