<template>
  <!-- 任务汇总 -->
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text=""
    @load="onLoad"
    class="page-padding list"
  >
    <van-cell v-for="(task, index) in list" :key="index">
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
  <EmptyPage message="当前手术任务" v-if="!list.length" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
  name: 'ItinerantNurSummary',
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
    const list: any = ref([]);
    const getData = () => {
      Request.xhr('querySummaryTaskList').then((r: CurrentTaskViews) => {
        if (r.data) {
          list.value = r.data.map((d: any) => {
            return {
              ...d,
              infoItems: formatTask(d, infoItems),
            };
          });
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
