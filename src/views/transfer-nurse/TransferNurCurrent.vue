<template>
  <EmptyPage message="当前暂无任务" v-if="!taskList.length && !loading" />
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
          room: task.opInfo.opDescName,
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
      />
      <!-- 任务描述 -->
      <KeyValueBlock>
        <template #value> {{ task.opTask.taskTipContent || "无" }} </template>
      </KeyValueBlock>
      <!--  交接操作 -->
      <template v-if="checkEditable(task)">

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

      <!-- 转送中 -->
      <template v-if="task.opInfo.opSectionCode === '5'">
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${task.opTask.handoverUserName} ${task.opTask.handoverUserPhone}`"
        />
      </template>
      <template v-if="task.opInfo.opSectionCode === '15'">
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${task.opTask.handoverUserName} ${task.opTask.handoverUserPhone}`"
        />
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
import { defineComponent, onMounted, ref, reactive } from 'vue';
import Request from '@/service/request';
import { Toast } from 'vant';
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
import ToastCountdown from '@/utils/toast-countdown';
import JsToFlutter from '@/utils/js-to-flutter';
import useTitleCount from '@/utils/useTitleCount';
export default defineComponent({
  name: 'TransferNurCurrent',
  setup() {
    const { updateTitleCount } = useTitleCount() as any;
    const loading = ref(false);
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
      loading.value = true;
      return Request.xhr('queryCurrentTaskList')
        .then((r: CurrentTaskViews) => {
          // console.log(r);
          if (r.code === 200) {
            taskList.value = r.data.map((d: any) => {
              return {
                ...d,
                infoItems: formatTask(d, infoItems),
              };
            });
          } else {
            taskList.value = [];
          }
          updateTitleCount(taskList.value.length)
        })
        .finally(() => {
          loading.value = false;
        });
    };
    getData();

    // 人工交接
    let currentTask: any = reactive({});
    const handleOverLay = reactive({
      show: false,
      value: '',
    });
    const manualHandle = (task: any) => {
      handleOverLay.show = true;
      currentTask = task;
      console.log(currentTask);
    };
    const manualOk = () => {
      handleOverLay.show = false;
      const data = {
        opInfoId: currentTask.opInfo.id,
        currentTaskId: currentTask.opTask.id,
        parentTaskId: currentTask.opTask.parentTaskId,
        userCode: handleOverLay.value,
      };
      next(data);
    };

    // 扫码交接
    const codeHandle = (task: any) => {
      // Toast('呼叫护工成功');
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

    const next = (data: any) => {
      // TODO 区分送手术室与送回病区操作
      const type: string =
        currentTask.opInfo.opSectionCode === '4'
          ? 'wardNurseHandover'
          : 'pickupNurseHandoverToWard';
      Request.xhr(type, data)
        .then((res: any) => {
          if (res.code === 200) {
            getData();
            ToastCountdown({
              message: '患者匹配成功，交接完成',
              seconds: 3,
            });
          } else {
            Toast(res.msg);
          }
        })
        .catch(() => {
          Toast('患者匹配失败');
        });
    };

    const checkEditable = (task: any) => {
      return (
        task.opInfo.opSectionCode === '4' || task.opInfo.opSectionCode === '14'
      );
    };

    // onMounted(() => {
    //   getData();
    // });
    return {
      loading,
      taskList,
      handleOverLay,
      manualHandle,
      manualOk,
      codeHandle,
      onMounted,
      getData,
      checkEditable,
    };
  },
});
</script>

<style scoped></style>
