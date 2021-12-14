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
      <KeyValue
        v-if="task.opPatientDTO.opSectionCode === '15'"
        label="目的地"
        :value="task.opPatientDTO.afterDepartmentName"
      />
      <FlowChart
        :flow-data="task.flowDatas"
        :current-code="task.currentCode"
      />
      <!-- 任务描述 -->
      <KeyValueBlock>
        <template #value>
          {{ task.description || "无" }}
        </template>
      </KeyValueBlock>
      <!--  交接操作 -->
      <template v-if="checkEditable(task)">
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${task.opTaskDTO.handUserName || ''} ${
            task.opTaskDTO.handUserPhone || ''
          }`"
        />
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

      <!-- 转送中 -->
      <template v-if="task.opPatientDTO.opSectionCode === '5'">
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${task.opTaskDTO.handUserName || ''} ${
            task.opTaskDTO.handUserPhone || ''
          }`"
        />
      </template>
      <!-- 10:手术后直接出来，15：手术后复苏出来 -->
      <template v-if="task.opPatientDTO.opSectionCode === '10'||task.opPatientDTO.opSectionCode === '15'">
        <KeyValueBlock
          clear
          label="交接人"
          :value="`${task.opTaskDTO.handUserName || ''} ${
            task.opTaskDTO.handUserPhone || ''
          }`"
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
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
import useTaskMixins, {
  circulatingNurseName,
  departmentName,
  hospitalCode,
  infectType,
  opInfoCode,
} from '../../utils/task-mixins';
import ToastCountdown from '@/utils/toast-countdown';
import JsToFlutter from '@/utils/js-to-flutter';
import useTitleCount from '@/utils/useTitleCount';
import { findNode } from '@/utils/utils';
export default defineComponent({
  name: 'TransferNurCurrent',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount() as any;
    const loading = ref(false);
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
      loading.value = true;
      return Request.xhr('queryCurrentOpTaskList')
        .then((r: CurrentTaskViews) => {
          if (r.code === 200) {
            taskList.value = r.data.map((d: any) => {
              // 需要处理当前的节点
              const { taskFlowPointDetailsDTOList }: any = d;
              const point = findNode(taskFlowPointDetailsDTOList, (d:any) => {
                return d.pointStatus === 1;
              })
              return {
                ...d,
                description: point?.description,
                overTime: point.overTime,
                infoItems: formatTask(d, infoItems),
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
    };
    const manualOk = () => {
      handleOverLay.show = false;
      const data = {
        opInfoId: currentTask.opTaskDTO.id,
        workId: handleOverLay.value,
        opTaskId: currentTask.opTaskDTO.id,
      }
      next(data, 'flowReverInputNext');
    };

    // 扫码交接
    const codeHandle = async (task: any, res:any) => {
      // Toast('呼叫护工成功');
      currentTask = task;
      if (!res) {
        res = await JsToFlutter.startScanQRCode()
      }
      if (res) {
        // TODO 调接口推进下一阶段
        const data = {
          opInfoId: currentTask.opTaskDTO.id,
          hospitalCode: res,
          opTaskId: currentTask.opTaskDTO.id,
        }
        next(data, 'flowReverScanNext');
      }
    };

    const next = (data: any, key = 'flowReverScanNext') => {
      // TODO 区分送手术室与送回病区操作
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
      })
        .catch(() => {
          Toast('患者匹配失败');
        });
    };

    const checkEditable = (task: any) => {
      return (
        task.opInfoDTO.opSectionCode === '4' || task.opInfoDTO.opSectionCode === '14'
      );
    };
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
