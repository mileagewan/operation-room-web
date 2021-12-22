<template>
  <!-- 手术室接送护士 当前任务 -->
  <EmptyPage message="当前暂无任务" v-if="!taskList.length" />
  <TaskView
    class="itinerant-nur-current"
    v-for="(task, index) in taskList"
    :key="index"
    :id="task.opPatientDTO.hospitalCode"
  >
    <template #header>
      <PatientDetail
        :option="{
          status: task.opInfoDTO.opSectionCode,
          name: task.opPatientDTO.name,
          sex: task.opPatientDTO.sex,
          age: task.opPatientDTO.age,
          type: task.opInfoDTO.type,
          room: task.opInfoDTO.descName,
          planTime: task.overTime,
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
        :flow-data="task.flowDatas"
        :current-code="task.currentCode"
      ></FlowChart>
      <!-- 任务描述 -->
      <KeyValueBlock>
        <template #value> {{ task.description || "无" }} </template>
      </KeyValueBlock>

        <KeyValueBlock
          clear
          label="交接人"
          :value="`${task.opTaskDTO.handUserName||''} ${task.opTaskDTO.handUserPhone||''}`"
        />
      <template v-if="task.opInfoDTO.opSectionCode === '5'">
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
            class="btn-operation"
            @click="codeHandle(task)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            扫码交接
          </van-button>
        </div>
      </template>

      <!-- 从手术室接出 -->
      <template v-if="isBack(task.opInfoDTO.opSectionCode)">
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
            class="btn-operation"
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
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { Toast } from 'vant';
import Request from '@/service/request';
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
import useTaskMixins, {
  circulatingNurseName,
  departmentName,
  hospitalCode,
  infectType,
  opInfoCode,
  anesthesiaDicCode,
  anesthetistName,
  beforeDiseaseName,
  opInfoName,
  surgeonName,
} from '../../utils/task-mixins';
import JsToFlutter from '@/utils/js-to-flutter';
import ToastCountdown from '@/utils/toast-countdown';
import useTitleCount from '@/utils/useTitleCount';
import { findNode } from '@/utils/utils';
export default defineComponent({
  name: 'OpratorTransferNurCurrent',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount() as any;
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
      handleOverLay.show = false;
      const data = {
        opInfoId: currentTask.opInfoDTO.id,
        workId: handleOverLay.value,
        opTaskId: currentTask.opTaskDTO.id,
      }
      next(data, 'flowReverInputNext');
    };

    const next = (data: any, key = 'flowReverNormalNext') => {
      Request.xhr(key, data).then((res: any) => {
        if (res.code === 200) {
          ToastCountdown({
            message: '患者匹配成功，交接完成',
            seconds: 3,
          });
          getData();
        } else {
          Toast(res.msg);
        }
      });
    };
    const codeHandle = async (task: any, res:any) => {
      currentTask = task;
      if (!res) {
        res = await JsToFlutter.startScanQRCode()
      }
      if (res) {
        // TODO 调接口推进下一阶段
        const data = {
          opInfoId: currentTask.opInfoDTO.id,
          hospitalCode: res,
          opTaskId: currentTask.opTaskDTO.id,
        }
        next(data, 'flowReverScanNext');
      }
    };

    const taskList: any = ref([]);
    const { formatTask } = useTaskMixins();
    const infoItems = [
      opInfoCode(),
      hospitalCode(),
      departmentName(),
      infectType(),
      circulatingNurseName(),
    ];
    const getData = () => {
      return Request.xhr('queryCurrentOpTaskList').then((r: CurrentTaskViews) => {
        if (r.data) {
          taskList.value = r.data.map((d: any) => {
            const { taskFlowPointDetailsDTOList }: any = d;
            const point = findNode(taskFlowPointDetailsDTOList, (d:any) => {
              return d.pointStatus === 1;
            })
            return {
              ...d,
              description: point.description,
              infoItems: formatTask(d, infoItems),
              overTime: point.overTime,
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
          });
        } else {
          taskList.value = [];
        }
        updateTitleCount(taskList.value.length);
        updateCardCacheData(taskList.value);
      });
    };

    // 是否从手术室接回
    const isBack = (statusCode: string) => {
      return ['10', '13'].includes(statusCode);
    }

    onMounted(() => {
      getData();
    })

    return {
      taskList,
      handleOverLay,
      manualHandle,
      manualOk,
      codeHandle,
      getData,
      isBack,
      onMounted
    };
  },
});
</script>

<style scoped></style>
