<template>
  <!-- 任务汇总 -->
  <EmptyPage message="暂无手术任务" v-if="!taskList.length && !loading"/>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text=""
    @load="getData"
    class="page-padding list"
  >
    <van-cell v-for="(task, index) in taskList" :key="index">
      <a href="" :id="`_${task.opPatientDTO.hospitalCode}`"></a>
      <ExpandCard
        :option="{
          status: task.opInfoDTO.opSectionCode,
          name: task.opPatientDTO.name,
          sex: task.opPatientDTO.sex,
          age: task.opPatientDTO.age,
          type: task.opInfoDTO.type,
          room: task.opInfoDTO.descName,
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
import { defineComponent, ref } from 'vue';
import Request from '@/service/request';
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
import useTitleCount from '@/hooks/useTitleCount';

export default defineComponent({
  name: 'WardNurSummary',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount() as any;
    const loading = ref(false);
    const finished = ref(true);
    const { formatTask } = useTaskMixins();
    const infoItems = [
      departmentName(),
      hospitalCode(),
      infectType(),
      surgeonName(),
      opInfoName(),
      beforeDiseaseName(),
      anesthetistName(),
      anesthesiaDicCode(),
      opInfoCode(),
      circulatingNurseName(),
    ];
    const taskList: any = ref([]);
    const getData = () => {
      loading.value = true;
      return Request.xhr('queryOpSummaryList')
        .then((r: any) => {
          if (r.data) {
            taskList.value = r.data.map((d: any) => {
              return {
                ...d,
                infoItems: formatTask(d, infoItems),
              };
            });
          } else {
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
      finished,
      taskList,
      getData,
    };
  },
});
</script>

<style scoped></style>
