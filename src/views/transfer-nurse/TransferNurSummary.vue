<template>
  <!-- 转运护工 任务池 -->
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
      <!--      送手术-->
      <template v-if="task.opInfo.opSectionCode === '4'">
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
    </template>
  </TaskView>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { curentData } from '@/utils/mock-test-data';
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
    // const testData = new Array(10).fill('').map((item, index) => {
    //   return {
    //     name: 'user' + (index + 1),
    //   };
    // });
    const list: any = ref([]);
    const getData = () => {
      // list = testdata.map((d: any) => {
      //   return {
      //     ...d,
      //     infoItems: formatTask(d, infoItems),
      //   };
      // });
      // console.log(list);

      // eslint-disable-next-line no-undef
      Request.xhr('queryTaskPoolList').then((r: CurrentTaskViews) => {
        // console.log(r);
        if (r.data) {
          list.value = r.data.map((d: any) => {
            return {
              ...d,
              infoItems: formatTask(d, infoItems),
            };
          });
          // console.log(list);
        }
        // TODO 数据list赋值处理
      });
    };
    getData();

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
      Request.xhr('getSso').then((r: ReturnData) => {
        console.log(r);
      });
    });
    return {
      list,
      recoveryTask,
      onMounted,
      getData,
    };
  },
});
</script>

<style scoped></style>
