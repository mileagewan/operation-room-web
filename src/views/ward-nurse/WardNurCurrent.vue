<template>
  <EmptyPage message="当前暂无任务" v-if="!taskList.length && !loading" />
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
      <!-- 任务描述 -->
      <KeyValueBlock>
        <template #value>
          {{ task.description || "无" }}
        </template>
      </KeyValueBlock>
      <template v-if="task.opTaskDTO.opSectionCode === '3'">
        <div class="ihybrid-button-center">
          <van-button
            round
            @click="callNurse(task)"
            class="btn-operation"
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            <IconFont icon="icon-hujiao" />
            呼叫护工
          </van-button>
        </div>
      </template>
      <template v-if="['4','5'].includes(task.opTaskDTO.opSectionCode)">
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${task.opTaskDTO.handUserName || ''} ${
            task.opTaskDTO.handUserPhone || ''
          }`"
        />
      </template>
      <template v-if="task.opTaskDTO.opSectionCode === '15'">
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
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { Toast } from 'vant';
import Request from '@/service/request';
import JsToFlutter from '@/utils/js-to-flutter';
import ToastCountdown from '@/utils/toast-countdown';
import { CurrentTaskViews, TaskItem } from '@/types/CurrentTaskViews';
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
import { findNode } from '@/utils/utils';

export default defineComponent({
  name: 'WardNurCurrent',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount() as any;
    const taskList: any = ref([]);
    const loading = ref(false);

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
      return Request.xhr('queryCurrentOpTaskList')
        .then((r: CurrentTaskViews) => {
          if (r.data) {
            taskList.value = r.data.map((d: any) => {
              const { taskFlowPointDetailsDTOList }: any = d;
              const point = findNode(taskFlowPointDetailsDTOList, (d:any) => {
                return d.pointStatus === 1;
              });
              return {
                ...d,
                description: point.description,
                overTime: point.overTime,
                infoItems: formatTask(d, infoItems),
              };
            });
          } else {
            taskList.value = [];
          }
          updateTitleCount(taskList.value.length);
          updateCardCacheData(taskList.value);
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
    const manualHandle = (task: TaskItem) => {
      currentTask = task;
      handleOverLay.show = true;
    };
    const manualOk = () => {
      handleOverLay.show = false;
      const data = {
        opInfoId: currentTask.opTaskDTO.id,
        workId: handleOverLay.value,
        opTaskId: currentTask.opTaskDTO.id,
      };
      next(data, 'flowReverInputNext');
    };
    const codeHandle = async (task: TaskItem, res:any) => {
      // Toast('呼叫护工成功');
      currentTask = task;
      if (!res) {
        res = await JsToFlutter.startScanQRCode();
      }
      // TODO 调接口推进下一阶段
      if (res) {
        const data = {
          opInfoId: currentTask.opTaskDTO.id,
          hospitalCode: res,
          opTaskId: currentTask.opTaskDTO.id,
        };
        next(data, 'flowReverScanNext');
      }
    };
    const next = (data: any, key = 'flowReverNormalNext') => {
      // TODO
      Request.xhr(key, data).then((res: any) => {
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
    const callNurse = (task: TaskItem) => {
      const data = {
        opTaskId: task.opTaskDTO.id
      };
      Request.xhr('flowReverNormalNext', data).then((res: any) => {
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
