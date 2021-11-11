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
      <!-- 任务描述 -->
      <KeyValueBlock>
        <template #value> {{ task.opTask.taskTipContent || "无" }} </template>
      </KeyValueBlock>
      <template v-if="task.opInfo.opSectionCode === '3'">
        <div class="ihybrid-button-center">
          <van-button
            round
            @click="callNurse(task)"
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            呼叫护工
          </van-button>
        </div>
      </template>
      <template
        v-if="
          task.opInfo.opSectionCode === '4' ||
          task.opInfo.opSectionCode === '15'
        "
      >
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${task.opTask.handoverUserName || ''} ${
            task.opTask.handoverUserPhone || ''
          }`"
        />
      </template>
      <template v-if="task.opInfo.opSectionCode === '15'">
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
import { Toast } from 'vant';
import Request from '@/service/request';
import JsToFlutter from '@/utils/js-to-flutter';
import ToastCountdown from '@/utils/toast-countdown';
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
import useTitleCount from '@/utils/useTitleCount';

export default defineComponent({
  name: 'WardNurCurrent',
  setup() {
    const { updateTitleCount } = useTitleCount() as any;
    const taskList: any = ref([]);
    const loading = ref(false);
    // onMounted(() => {
    //   Request.xhr('getSso').then((r: ReturnData) => {
    //     console.log(r);
    //   });
    // });

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
        })
        .finally(() => {
          loading.value = false;
        });
    };

    let currentTask: any = reactive({});
    const handleOverLay = reactive({
      show: false,
      value: '',
    });
    const manualHandle = (task: any) => {
      currentTask = task;
      handleOverLay.show = true;
    };
    const manualOk = () => {
      console.log(handleOverLay);
      handleOverLay.show = false;
      const data = {
        opInfoId: currentTask.opInfo.id,
        currentTaskId: currentTask.opTask.id,
        parentTaskId: currentTask.opTask.parentTaskId,
        userCode: handleOverLay.value,
      };
      next(data);
    };
    const codeHandle = (task: any) => {
      currentTask = task;
      JsToFlutter.startScanQRCode().then((res) => {
        console.log('扫码结果：', res);
        // TODO 调接口推进下一阶段
        if (res) {
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
      // TODO
      Request.xhr('wardNurseReceive', data).then((res: any) => {
        if (res.code === 200) {
          getData();
          ToastCountdown({
            message: '患者匹配成功，交接完成',
            seconds: 3,
          });
        } else {
          Toast(res.msg);
        }
      });
    };

    // 呼叫转运护工
    const callNurse = (task: any) => {
      const data = {
        opInfoId: task.opInfo.id,
        currentTaskId: task.opTask.id,
        parentTaskId: task.opTask.parentTaskId,
      };
      Request.xhr('wardNurseCall', data).then((res: any) => {
        // console.log(res);
        if (res.code === 200) {
          Toast('呼叫护工成功');
          getData();
        }
      });
    };

    getData();
    return {
      loading,
      getData,
      taskList,
      handleOverLay,
      manualHandle,
      manualOk,
      codeHandle,
      callNurse,
      onMounted,
    };
  },
});
</script>

<style scoped></style>
