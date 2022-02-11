<template>
  <TaskView
    class="itinerant-nur-current"
    v-for="(taskView, index) in taskViewsList"
    :key="index"
    :id="taskView.opPatientDTO.hospitalCode"
  >
    <template #header>
      <PatientDetail
        :option="{
          status: taskView.opInfoDTO.opSectionCode,
          name: taskView.opPatientDTO.name,
          sex: taskView.opPatientDTO.sex,
          age: taskView.opPatientDTO.age,
          type: taskView.opInfoDTO.type,
          room: taskView.opInfoDTO.descName,
          planTime: taskView.overTime,
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
      <div class="resuscitation-flow-chart">
        <FlowChart
          :flow-data="taskView.flowDatas"
          :current-code="taskView.currentCode"
        />
      </div>
      <KeyValueBlock>
        <template #value>
          {{ taskView.description || "无" }}
        </template>
      </KeyValueBlock>

      <template v-if="taskView.opInfoDTO.opSectionCode === '11'">
        <KeyValueBlock
          clear
          label="发布人"
          :value="`${taskView.opTaskDTO.publishUserName} ${taskView.opTaskDTO.publishUserPhone}`"
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
            class="btn-operation"
            @click="codeHandle(taskView)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            扫码交接
          </van-button>
        </div>
      </template>

      <template v-if="taskView.opInfoDTO.opSectionCode === '12'">
        <div class="ihybrid-button-center">
          <van-button
            class="btn-operation"
            @click="callNurse(taskView)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            <IconFont icon="icon-hujiao" />
            呼叫转运护工
          </van-button>
        </div>
      </template>

      <template v-if="taskView.opInfoDTO.opSectionCode === '13'">
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${taskView.opTaskDTO.handUserName} ${taskView.opTaskDTO.handUserPhone}`"
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
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
import ToastCountdown from '@/utils/toast-countdown';
import useTitleCount from '@/utils/useTitleCount';
import { findNode } from '@/utils/utils';
import useTimeInterval from '@/mixins/useTimeInterval';
export default defineComponent({
  name: 'ResuscitationNurCurrent',
  setup() {
    const { formatTask } = useTaskMixins();
    const { updateTitleCount, updateCardCacheData } = useTitleCount();
    const { interval } = useTimeInterval();

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

    const preLoading = ref<Promise<boolean>>(Promise.resolve(true));

    const manualHandle = (taskView: any) => {
      handleOverLay.show = true;
      handleOverLay.row = taskView;
    };
    const manualOk = async () => {
      const ret: ReturnData = await Request.xhr(
        'flowReverInputNext',
        {
          opInfoId: (handleOverLay.row as any)?.opInfoDTO?.id || '',
          workId: handleOverLay.value,
          opTaskId: (handleOverLay.row as any)?.opTaskDTO?.id || '',
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
    const codeHandle = async (row: any, ret:any) => {
      if (!ret) {
        ret = await JsToFlutter.startScanQRCode();
      }
      const data: ReturnData = await Request.xhr(
        'flowReverScanNext',
        {
          opInfoId: row.opInfoDTO.id,
          hospitalCode: ret,
          opTaskId: row.opTaskDTO.id,
          stepFlag: 1,
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
        Toast(data.msg as string);
      }
    };

    const callNurse = async (row: any) => {
      const r: boolean = await preLoading.value;
      if (!r) {
        return;
      }
      preLoading.value = Promise.resolve(false);
      Request.xhr('flowReverNormalNext', {
        opTaskId: row.opTaskDTO.id || '',
      }).then(async (ret: ReturnData) => {
        if (ret.code === 200) {
          Toast('呼叫护工成功');
          await getData();
        }
        preLoading.value = Promise.resolve(true);
      }).catch(() => {
        preLoading.value = Promise.resolve(true);
      })
    };
    const getData = (): Promise<any> => {
      return Request.xhr('queryCurrentOpTaskList')
        .then((r: CurrentTaskViews) => {
          if (r.code === 200) {
            taskViewsList.value = r.data.map((d) => {
              const { taskFlowPointDetailsDTOList }: any = d;
              const point = findNode(taskFlowPointDetailsDTOList, (d:any) => {
                return d.pointStatus === 1;
              });
              return {
                ...d,
                overTime: point.overTime,
                description: point.description,
                taskList: formatTask(d, taskList),
                flowDatas: taskFlowPointDetailsDTOList.map((p:any) => {
                  return {
                    ...p,
                    title: p.pointName,
                    icon: '',
                    code: p.pointCode
                  }
                }),
                currentCode: point.pointCode
              };
            }) as any;
          } else {
            taskViewsList.value = [];
          }
          updateTitleCount(taskViewsList.value.length);
          updateCardCacheData(taskViewsList.value);
        });
    };
    onMounted(() => {
      getData();
      interval(getData);
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
