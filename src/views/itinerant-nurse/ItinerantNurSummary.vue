<template>
  <!-- 任务汇总 -->
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text=""
    class="page-padding list"
  >
    <van-cell v-for="(task, index) in list" :key="index">
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
import useTitleCount from '@/hooks/useTitleCount';
export default defineComponent({
  name: 'ItinerantNurSummary',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount();

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
    const list: any = ref([]);
    const getData = () => {
      return Request.xhr('queryOpSummaryList').then((r: CurrentTaskViews) => {
        if (r.data) {
          list.value = r.data.map((d: any) => {
            return {
              ...d,
              infoItems: formatTask(d, infoItems),
            };
          });
        } else {
          list.value = [];
        }
        updateTitleCount(list.value.length);
        updateCardCacheData(list.value);
        // TODO 数据list赋值处理
      });
    };
    getData();
    return {
      loading,
      finished,
      list,
      getData,
    };
  },
});
</script>
