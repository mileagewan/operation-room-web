<template>
  <TaskView
    class="itinerant-nur-current"
    v-for="(task, index) in list"
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
      <template v-if="task.opInfo.opSectionCode === '4'">
        <KeyValueBlock clear label="交接人" value="力度 13800138000" />
      </template>
      <template v-if="task.opInfo.opSectionCode === '15'">
        <div class="ihybrid-button-group">
          <van-button
            round
            @click="manualHandle"
            class="default-button"
            color="#f0fafe"
          >
            人工交接
          </van-button>
          <van-button
            icon="scan"
            @click="codeHandle"
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
import { curentData, testdata } from '@/utils/mock-test-data';
import { Toast } from 'vant';
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';
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

export default defineComponent({
  name: 'WardNurCurrent',
  setup() {
    const handleOverLay = reactive({
      show: false,
      value: '',
    });

    const list: any = ref([]);

    onMounted(() => {
      Request.xhr('getSso').then((r: ReturnData) => {
        console.log(r);
      });
    });

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
      // list.value = testdata.map((d: any) => {
      //   return {
      //     ...d,
      //     infoItems: formatTask(d, infoItems),
      //   };
      // });
      Request.xhr('queryCurrentTaskList').then((r: CurrentTaskViews) => {
        // const { code, data } = r;
        console.log(r);
        if (r.data) {
          list.value = r.data.map((d: any) => {
            return {
              ...d,
              infoItems: formatTask(d, infoItems),
            };
          });
        }
      });
    };
    const manualHandle = () => {
      handleOverLay.show = true;
    };
    const manualOk = () => {
      console.log(handleOverLay);
      handleOverLay.show = false;
    };
    const codeHandle = () => {
      JsToFlutter.startScanQRCode().then((res) => {
        console.log(res);
        // TODO 调接口推进下一阶段
      });
      ToastCountdown({
        message: '患者匹配成功，交接完成',
        seconds: 3,
      });
    };

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
          getData()
        }
      });
    };

    // 触发手术任务
    // Request.xhr('createNextOpTask', {}, 'opInfoId=29').then((r: any) => {
    //   // const { code, data } = r;
    //   console.log(r);
    // });

    getData();
    return {
      getData,
      list,
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
