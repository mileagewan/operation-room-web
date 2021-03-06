<template>
  <TaskView class="chiefnur-current"
            v-for="(taskView, index) in taskViewsList"
            :key="index"
            :id="taskView.opPatientDTO.hospitalCode"
  >
    <template #header>
      <PatientDetail :option="{
        status: taskView.opInfoDTO.opSectionCode,
        name: taskView.opPatientDTO.name,
        sex: taskView.opPatientDTO.sex,
        age: taskView.opPatientDTO.age,
        type: taskView.opInfoDTO.type,
        room: taskView.opInfoDTO.descName,
        planTime: taskView.overTime
      }"/>
    </template>
    <template #content>
      <KeyValue
        v-for="(item, i) in taskView.taskList"
        :value="item.value"
        :danger="item.danger"
        :key="i"
      >
        <template #label>
          {{ item.label }}
        </template>
      </KeyValue>
      <KeyValue label="状态节点">
        <template #value>
          <FlowChart :flow-data="taskView.flowData"
                     :current-code="taskView.currentCode" />
        </template>
      </KeyValue>
      <KeyValue :label="taskView.opTaskDTO.roleName"
                important
                :value="`${taskView.opTaskDTO?.exeUserName || '-'} ${taskView.opTaskDTO?.exeUserPhone || '-'}`" />
      <KeyValue :label="taskView.nextOpTaskDTO?.roleName"
                v-if="taskView.nextOpTaskDTO"
                important
                :value="`${taskView.nextOpTaskDTO?.exeUserName || '-'} ${taskView.nextOpTaskDTO?.exeUserPhone || '-'}`" />
    </template>
  </TaskView>
  <EmptyPage message="当前暂无任务" v-if="!taskViewsList.length" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
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
  surgeonName
} from '../../utils/task-mixins';
import { Task } from '@/types/interface-model';
import Request from '../../service/request';
import useTitleCount from '@/hooks/useTitleCount';
import { iconMaps } from '@/views/chief-coordination-nurse/iconMaps';
import { findNode } from '@/utils/utils';
import useTimeInterval from '@/hooks/useTimeInterval';

export default defineComponent({
  name: 'ChiefNurCurrent',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount();
    const { interval } = useTimeInterval();

    const { formatTask } = useTaskMixins()
    const taskList:Task[] = [
      opInfoCode(),
      hospitalCode(),
      departmentName(),
      surgeonName(),
      circulatingNurseName(),
      anesthetistName(),
      anesthesiaDicCode(),
      infectType(),
      opInfoName(),
      beforeDiseaseName()
    ];
    const flowData = reactive([]);
    const taskViewsList = ref([])

    const getData = () => {
      return Request.xhr('queryCurrentAbnormalOpTaskList', {})
        .then((r: any) => {
          const { code, data } = r;
          if (code === 200) {
            taskViewsList.value = data.map((d:any) => {
              const { adjacentOpSectionDetailsDTOList }: any = d;
              const point = findNode(adjacentOpSectionDetailsDTOList, (d: any) => {
                return d.currentOpSection === 1;
              });
              const flowData: Array<{
                title: string;
                code:string;
                icon: any;
              }> = (d.adjacentOpSectionDetailsDTOList || []).map((ad:any) => {
                return {
                  title: ad.opSectionName,
                  code: ad.opSectionCode,
                  icon: iconMaps.get(ad.opSectionCode) || 'icon-weikaishishoushu'
                }
              })

              return {
                ...d,
                taskList: formatTask(d, taskList),
                currentCode: point?.opSectionCode,
                flowData: flowData
              };
            }) as any
          } else {
            taskViewsList.value = []
          }
          updateTitleCount(taskViewsList.value.length)
          updateCardCacheData(taskViewsList.value);
        })
    }
    onMounted(() => {
      getData();
      interval(getData);
    })
    return {
      flowData,
      taskViewsList,
      getData,
      onMounted
    };
  },
});
</script>

<style scoped></style>
