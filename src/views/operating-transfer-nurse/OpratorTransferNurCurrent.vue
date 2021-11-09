<template>
  <!-- 手术室接送护士 当前任务 -->
  <EmptyPage message="当前暂无任务" v-if="!taskList.length" />
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
          age: task.patient.age,
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
      <FlowChart
        :flow-data="task.operatingStatusList"
        :current-code="task.currentOperatingStatus"
      ></FlowChart>
      <!-- 任务描述 -->
      <KeyValueBlock>
        <template #value> {{ task.opTask.taskTipContent || "无" }} </template>
      </KeyValueBlock>

      <template v-if="task.opInfo.opSectionCode === '5'">
        <KeyValueBlock clear label="交接人" value="力度 13800138000" />
        <div class="ihybrid-button-group">
          <van-button
            round
            @click="manualHandle(task)"
            class="default-button"
            color="#f0fafe"
          >
            人工交接
          </van-button>
          <van-button
            icon="scan"
            @click="codeHandle(task)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            扫码交接
          </van-button>
        </div>
      </template>

      <template v-if="task.opInfo.opSectionCode === '6'">
        <KeyValueBlock clear label="交接人" value="力度 13800138000" />
      </template>

      <!-- 从手术室接出 -->
      <template v-if="isBack(task.opInfo.opSectionCode)">
        <KeyValueBlock clear label="交接人" value="力度 13800138000" />
        <div class="ihybrid-button-group">
          <van-button
            round
            @click="manualHandle(task)"
            class="default-button"
            color="#f0fafe"
          >
            人工交接
          </van-button>
          <van-button
            icon="scan"
            @click="codeHandle(task)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            扫码交接
          </van-button>
        </div>
      </template>

      <template v-if="task.opInfo.opSectionCode === '14'">
        <KeyValueBlock clear label="交接人" value="力度 13800138000" />
      </template>
    </template>
  </TaskView>
  <HandleOverLay
    v-model:visible="handleOverLay.show"
    @ok="manualOk"
    v-model="handleOverLay.value"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { curentData } from '@/utils/mock-test-data';
import { Toast } from 'vant';
import Request from '@/service/request';
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
import JsToFlutter from '@/utils/js-to-flutter';
import ToastCountdown from '@/utils/toast-countdown';
export default defineComponent({
  name: 'OpratorTransferNurCurrent',
  setup() {
    const handleOverLay = reactive({
      show: false,
      value: '',
    });
    let currentTask: any = reactive({});

    const manualHandle = (task: any) => {
      handleOverLay.show = true;
      currentTask = task;
    };
    const manualOk = () => {
      // console.log(handleOverLay);
      handleOverLay.show = false;
      // console.log(handleOverLay);
      handleOverLay.show = false;
      // console.log(currentTask);

      const data = {
        opInfoId: currentTask.opInfo.id,
        currentTaskId: currentTask.opTask.id,
        parentTaskId: currentTask.opTask.parentTaskId,
        userCode: handleOverLay.value,
      };
      next(data);
    };

    const next = (data: any) => {
      const xhrType: string = isBack(currentTask.opInfo.opSectionCode)
        ? 'circuitNurseHandoverToWard'
        : 'transferWorkHandover';
      Request.xhr(xhrType, data).then((res: any) => {
        if (res.code === 200) {
          ToastCountdown({
            message: '患者匹配成功，交接完成',
            seconds: 3,
          });
          getData();
        }
      });
    };
    const codeHandle = (task: any) => {
      currentTask = task;
      JsToFlutter.startScanQRCode().then((res) => {
        console.log('扫码结果：', res);
        if (res) {
          // TODO 调接口推进下一阶段
          const data = {
            opInfoId: currentTask.opInfo.id,
            currentTaskId: currentTask.opTask.id,
            parentTaskId: currentTask.opTask.parentTaskId,
            hospitalCode: res,
          };
          next(data);
        }
      });
    };

    const taskList: any = ref([]);
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
    const getData = () => {
      Request.xhr('queryCurrentTaskList').then((r: CurrentTaskViews) => {
        console.log(r);
        if (r.data) {
          taskList.value = r.data.map((d: any) => {
            return {
              ...d,
              infoItems: formatTask(d, infoItems),
            };
          });
          console.log(taskList);
        }
      });
    };
    getData();

    // 是否从手术室接回
    const isBack = (statusCode: string) => {
      return ['10', '13'].includes(statusCode);
    };

    onMounted(() => {
      // Request.xhr('getSso').then((r: ReturnData) => {
      //   console.log(r);
      // });
    });
    return {
      taskList,
      handleOverLay,
      manualHandle,
      manualOk,
      codeHandle,
      onMounted,
      isBack,
    };
  },
});
</script>

<style scoped></style>
