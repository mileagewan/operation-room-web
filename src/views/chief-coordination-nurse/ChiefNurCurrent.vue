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
      <KeyValue label="状态节点" v-if="['6','7','8','9','10'].includes(taskView.opInfo.opSectionCode)">
        <template #value>
          <FlowChart :flow-data="taskView.flowData"
                     :current-code="taskView.currentCode" />
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
  <EmptyPage message="当前暂无任务" v-if="!taskViewsList.length" />
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
import useTitleCount from '@/utils/useTitleCount';
export default defineComponent({
  name: 'ChiefNurCurrent',
  setup() {
    const { updateTitleCount } = useTitleCount();

    const map = new Map<number, any>([
      [6, {
        title: '到手术室',
        icon: 'icon-shoushushi1'
      }],
      [7, {
        title: '到手术间',
        icon: 'icon-shoushujian'
      }],
      [8, {
        title: '麻醉',
        icon: 'icon-mazui'
      }],
      [9, {
        title: '手术中',
        icon: 'icon-shoushuzhong'
      }],
      [10, {
        title: '苏醒',
        icon: 'icon-suxing'
      }]
    ]);

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
      return Request.xhr('roomGettotaltask', {
        pageNo: 1,
        pageSize: 300
      }).then((r: CurrentTaskViews) => {
        const { code, data } = r;
        if (code === 200) {
          taskViewsList.value = data.map((d) => {
            const currentCode = Number(d.opInfo.opSectionCode);
            let flowData: any[] = []
            d.handoverPerson = d.handoverPerson || { name: '-', phone: '-' }
            d.responsiblePerson = d.responsiblePerson || { name: '-', phone: '-' }
            if (currentCode > 6 && currentCode < 10) {
              flowData = [
                {
                  ...map.get(currentCode - 1) as any,
                  code: currentCode - 1,
                },
                {
                  ...map.get(currentCode),
                  code: currentCode
                },
                {
                  ...map.get(currentCode + 1),
                  code: currentCode + 1
                }
              ]
            } else if (currentCode === 6) {
              flowData = [
                {
                  ...map.get(currentCode),
                  code: currentCode
                },
                {
                  ...map.get(currentCode + 1),
                  code: currentCode + 1
                },
                {
                  ...map.get(currentCode + 2),
                  code: currentCode + 2
                }
              ]
            } else if (currentCode === 10) {
              flowData = [
                {
                  ...map.get((currentCode - 2)),
                  code: currentCode - 2
                },
                {
                  ...map.get(currentCode - 1),
                  code: currentCode - 1
                },
                {
                  ...map.get(currentCode),
                  code: (currentCode)
                }
              ]
            }

            return {
              ...d,
              taskList: formatTask(d, taskList),
              currentCode,
              flowData: flowData
            };
          }) as any
        } else {
          taskViewsList.value = []
        }
        updateTitleCount(taskViewsList.value.length)
        console.log(taskViewsList.value)
      })
    }
    onMounted(() => {
      getData()
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
