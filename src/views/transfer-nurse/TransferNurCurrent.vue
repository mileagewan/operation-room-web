<template>
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
      <!--      送手术-->
      <template v-if="task.opInfo.opSectionCode === '4'">
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

      <!--        转送中-->
      <template v-if="task.opInfo.opSectionCode === '5'">
        <KeyValueBlock clear label="交接人" value="力度 13800138000" />
      </template>

      <template v-if="task.opInfo.opSectionCode === '14'">
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

      <!--        转送中-->
      <template v-if="task.opInfo.opSectionCode === '15'">
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
export default defineComponent({
  name: 'TransferNurCurrent',
  setup() {
    const handleOverLay = reactive({
      show: false,
      value: '',
    });

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
          taskList.value = r.data.map((d: any) => {
            return {
              ...d,
              infoItems: formatTask(d, infoItems),
            };
          });
        }
      });
    };
    getData()

    const manualHandle = () => {
      handleOverLay.show = true;
    };
    const manualOk = () => {
      console.log(handleOverLay);
      handleOverLay.show = false;
    };
    const codeHandle = () => {};

    const callNurse = () => {
      Toast('呼叫护工成功');
    };

    onMounted(() => {
      Request.xhr('getSso').then((r: ReturnData) => {
        console.log(r);
      });
    });
    return {
      taskList,
      handleOverLay,
      manualHandle,
      manualOk,
      codeHandle,
      callNurse,
      onMounted,
      getData
    };
  },
});
</script>

<style scoped></style>
