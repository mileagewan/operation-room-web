<template>
  <TaskView class="chiefnur-current"
            v-for="(taskView, index) in taskViewsList"
            :key="index"
  >
    <template #header>
      <PatientDetail :option="{
        status: taskView.opInfo.opSectionCode,
        name: taskView.patient.name,
        sex: taskView.patient.sex === 1 ? '男' : '女',
        age: taskView.age,
        type: taskView.opInfo.type,
        room: taskView.opInfo. oproomName,
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
          <FlowChart></FlowChart>
        </template>
      </KeyValue>
      <KeyValue label="手术室接送护士"
                important
                :value="`${taskView.handoverPerson.name} ${taskView.handoverPerson.phone}`" />
      <KeyValue label="巡回护士电话"
                important
                :value="`${taskView.responsiblePerson.name} ${taskView.responsiblePerson.phone}`" />
    </template>
  </TaskView>
</template>

<script lang="ts">
import { FlowData2 } from '@/utils/mock-test-data'
import { defineComponent, onMounted, reactive, ref } from 'vue';
import useTaskMixins, {
  anesthesiaDicCode,
  anesthetistName,
  beforeDiseaseName,
  circulatingNurseName,
  departmentName,
  hospitalCode, infectType,
  opInfoCode, opInfoName,
  surgeonName
} from '../../utils/task-mixins';
import { Task } from '@/types/interface-model';
import { CurrentTaskViews, } from '@/types/CurrentTaskViews';
import Request from '../../service/request';
export default defineComponent({
  name: 'ChiefNurCurrent',
  setup() {
    const { formatTask } = useTaskMixins()
    const taskList:Task[] = [
      opInfoCode(),
      hospitalCode(),
      departmentName(),
      surgeonName(),
      circulatingNurseName(),
      anesthetistName(),
      anesthesiaDicCode('anesthesiaName'),
      infectType(),
      opInfoName(),
      beforeDiseaseName()
    ];
    const flowData = reactive(FlowData2);
    const taskViewsList = ref([])

    const getData = () => {
      // eslint-disable-next-line no-undef
      Request.xhr('roomGettotaltask', {
        pageNo: 1,
        pageSize: 300
      }).then((r: CurrentTaskViews) => {
        const { code, data } = r;
        if (code === 200) {
          taskViewsList.value = data.map((d) => {
            return {
              ...d,
              taskList: formatTask(d, taskList)
            }
          }) as any
        }
        console.log(taskViewsList.value)
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      flowData,
      taskViewsList,
      onMounted
    };
  },
});
</script>

<style scoped></style>
