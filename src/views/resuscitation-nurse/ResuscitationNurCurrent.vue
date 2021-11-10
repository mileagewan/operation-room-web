<template>
  <TaskView
    class="itinerant-nur-current"
    v-for="(taskView, index) in taskViewsList"
    :key="index"
  >
    <template #header>
      <PatientDetail
        :option="{
          status: taskView.opInfo.opSectionCode,
          name: taskView.patient.name,
          sex: taskView.patient.sex,
          age: taskView.patient.age,
          type: taskView.opInfo.type,
          room: taskView.opInfo.opDescName,
        }"
      />
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
      <div class="itinerant-flow-chart">
        <FlowChart
          :flow-data="taskView.operatingStatusList"
          :current-code="taskView.currentOperatingStatus"
        />
      </div>
      <KeyValueBlock>
        <template #value>
          {{ taskView.opTask.taskTipContent || "无" }}
        </template>
      </KeyValueBlock>

      <template v-if="taskView.opInfo.opSectionCode === '11'">
        <KeyValueBlock
          clear
          label="发布人"
          :value="`${taskView.opTask.handoverUserName} ${taskView.opTask.handoverUserPhone}`"
        />
        <div class="ihybrid-button-group">
          <van-button
            round
            @click="manualHandle(taskView)"
            class="default-button"
            color="#f0fafe"
          >
            人工交接
          </van-button>
          <van-button
            icon="scan"
            @click="codeHandle(taskView)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            扫码交接
          </van-button>
        </div>
      </template>

      <template v-if="taskView.opInfo.opSectionCode === '12'">
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${taskView.opTask.handoverUserName} ${taskView.opTask.handoverUserPhone}`"
        />
        <div class="ihybrid-button-center">
          <van-button
            icon="scan"
            @click="callNurse(taskView)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            呼叫转运护工
          </van-button>
        </div>
      </template>

      <template v-if="taskView.opInfo.opSectionCode === '13'">
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${taskView.opTask.handoverUserName} ${taskView.opTask.handoverUserPhone}`"
        />
      </template>
    </template>
  </TaskView>
  <EmptyPage message="当前暂无任务" v-if="!taskViewsList.length" />
  <HandleOverLay
    v-model:visible="handleOverLay.show"
    @ok="manualOk"
    v-model="handleOverLay.value"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { Toast } from 'vant';
import Request from '@/service/request';
import { ReturnData, Task } from '@/types/interface-model';
import useTaskMixins, {
  opInfoCode,
  hospitalCode,
  departmentName,
  surgeonName,
  circulatingNurseName,
  anesthetistName,
  anesthesiaDicCode,
  infectType,
  opInfoName,
  beforeDiseaseName,
} from '@/utils/task-mixins';
import JsToFlutter from '@/utils/js-to-flutter';
import { CurrentTaskViews, TaskViewItem } from '@/types/CurrentTaskViews';
import ToastCountdown from '@/utils/toast-countdown';
export default defineComponent({
  name: 'ResuscitationNurCurrent',
  setup() {
    const { formatTask } = useTaskMixins();
    const handleOverLay = reactive({
      show: false,
      value: '',
      row: {},
    });

    const taskList: Task[] = [
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
    const taskViewsList = ref([]);
    const manualHandle = (taskView: any) => {
      handleOverLay.show = true;
      handleOverLay.row = taskView;
    };
    const manualOk = async () => {
      const ret: ReturnData = await Request.xhr(
        'circuitNurseHandoverToRecovery',
        {
          userCode: handleOverLay.value,
          opInfoId: (handleOverLay.row as any)?.opInfo?.id || '',
          currentTaskId: (handleOverLay.row as any)?.opTask?.id || '',
          parentTaskId: (handleOverLay.row as any)?.opTask?.parentTaskId || '',
        }
      );
      if (ret.code === 200) {
        ToastCountdown({
          message: '患者匹配成功，交接完成',
          seconds: 3,
        });
        handleOverLay.show = false;
        getData();
      }
    };
    const codeHandle = async (row: any) => {
      const ret: string = await JsToFlutter.startScanQRCode();
      const data: ReturnData = await Request.xhr(
        'circuitNurseHandoverToRecovery',
        {
          opInfoId: row.opInfo.id || '',
          currentTaskId: row.opTask.id || '',
          parentTaskId: row.opTask.parentTaskId || '',
          hospitalCode: ret || '188752',
        }
      );
      if (data.code === 200) {
        const toast = Toast({
          duration: 0,
          overlay: true,
          message: '患者匹配成功，交接完成3s',
        });

        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `患者匹配成功，交接完成${second}s`;
          } else {
            clearInterval(timer);
            getData();
            Toast.clear();
          }
        }, 1000);
      } else {
        Toast('扫码交接失败');
      }
    };

    const callNurse = async (row: TaskViewItem) => {
      const ret: ReturnData = await Request.xhr('recoveryRoomNurseCall', {
        opInfoId: row.opInfo.id || '',
        currentTaskId: row.opTask.id || '',
        parentTaskId: row.opTask.parentTaskId || '',
      });
      if (ret.code === 200) {
        Toast('呼叫护工成功');
        getData();
      }
    };
    const getData = (): Promise<any> => {
      // eslint-disable-next-line no-undef
      return Request.xhr('queryCurrentTaskList').then((r: CurrentTaskViews) => {
        if (r.code === 200) {
          taskViewsList.value = r.data.map((d) => {
            return {
              ...d,
              taskList: formatTask(d, taskList),
            };
          }) as any;
        }
      });
    };
    onMounted(() => {
      getData();
    });
    return {
      handleOverLay,
      manualHandle,
      manualOk,
      codeHandle,
      callNurse,
      onMounted,
      taskViewsList,
      getData,
    };
  },
});
</script>

<style scoped></style>
