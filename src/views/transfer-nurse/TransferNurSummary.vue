<template>
  <!-- 转运护工 任务池 -->
  <EmptyPage message="当前暂无任务发布" v-if="!taskList.length" />
  <TaskView
    class="itinerant-nur-current"
    v-for="(task, index) in taskList"
    :key="index"
  >
    <template #header>
      <PatientDetail
        :option="{
          status: task.opInfo.opSectionCode,
          name: task.patient.name,
          sex: task.patient.sex,
          age: task.age,
          type: task.opInfo.type,
          room: task.opInfo.oproomName,
        }"
      />
    </template>
    <template #content>
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
      <KeyValueBlock>
        <template #value> 无 </template>
      </KeyValueBlock>
      <!-- 接任务操作 -->
      <div class="ihybrid-button-center">
        <van-button
          @click="recoveryTask(task)"
          round
          color="linear-gradient(to right, #00D6FA, #00ACF2)"
        >
          <IconFont icon="icon-jierenwu" />
          <span>接任务</span>
        </van-button>
      </div>
    </template>
  </TaskView>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { Toast } from 'vant';
import Request from '../../service/request';
import { ReturnData } from '@/types/interface-model';
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
  name: 'TransferNurSummary',
  setup() {
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
      Request.xhr('queryTaskPoolList').then((r: CurrentTaskViews) => {
        if (r.data) {
          taskList.value = r.data.map((d: any) => {
            return {
              ...d,
              infoItems: formatTask(d, infoItems),
            };
          });
        }
      });
    };
    getData();

    // 接任务操作
    const recoveryTask = (task: any) => {
      const data = {
        opInfoId: task.opInfo.id,
        currentTaskId: task.opTask.id,
        parentTaskId: task.opTask.parentTaskId,
      };
      Request.xhr('recoveryTask', data).then((res: any) => {
        console.log(res);
        if (res.code === 200) {
          Toast('接任务成功');
          getData();
        }
      });
    };

    onMounted(() => {
      getData();
    });
    return {
      taskList,
      recoveryTask,
      onMounted,
      getData,
    };
  },
});
</script>

<style scoped></style>
