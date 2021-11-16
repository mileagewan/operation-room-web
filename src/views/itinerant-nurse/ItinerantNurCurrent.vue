<template>
  <TaskView
    class="itinerant-nur-current"
    v-for="(taskView, index) in taskViewsList"
    :key="index"
  >
    <template #header>
      <PatientDetail
        :option="{
          status: taskView.opInfo.opSectionCode,
          name: taskView.patient.name,
          sex: taskView.patient.sex,
          age: taskView.patient.age,
          type: taskView.opInfo.type,
          room: taskView.opInfo.opDescName,
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
      <div class="itinerant-flow-chart">
        <FlowChart
          :flow-data="taskView.operatingStatusList"
          :current-code="taskView.currentOperatingStatus"
        />
      </div>
      <key-value-block>
        <template #value>
          {{ taskView.opTask.taskTipContent || "无" }}
        </template>
      </key-value-block>
      <template v-if="taskView.opInfo.opSectionCode === '6'">
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
      <template v-else-if="taskView.opInfo.opSectionCode === '7'">
        <div class="ihybrid-button-group">
          <van-button
          class="btn-operation"
          @click="thirdPartyConfirm(taskView)"
          round
          color="linear-gradient(to right, #00D6FA, #00ACF2)"
        >
          <IconFont icon="icon-sanfangqueren" />
          三方确认
        </van-button>
        </div>
      </template>
      <template v-else-if="taskView.opInfo.opSectionCode === '8'">
        <div class="ihybrid-button-group">
          <van-button
          class="btn-operation"
          @click="operationBegan(taskView)"
          round
          color="linear-gradient(to right, #00D6FA, #00ACF2)"
        >
          <IconFont icon="icon-shoushukaishi1" />
          手术开始
        </van-button>
        </div>
      </template>
      <template v-else-if="taskView.opInfo.opSectionCode === '9'">
        <div class="ihybrid-button-group">
          <van-button
            round
            :disabled="taskView.notifyNextOperation === 2"
            v-if="taskView.notifyNextOperation !== 3"
            @click="noticeNext(taskView)"
            class="default-button"
            color="#f0fafe"
          >
           {{taskView.notifyNextOperation === 2 ? '已通知下一台手术' : '通知下一台术前准备'}}
          </van-button>
          <van-button
            class="btn-operation"
            @click="resuscitationHandle(taskView)"
            round
            :disabled="taskView.notifyNextOperation === 1 "
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            <IconFont icon="icon-shoushuwancheng" />
            手术完成
          </van-button>
        </div>
      </template>
      <template v-if="taskView.opInfo.opSectionCode === '10'">
        <!-- <key-value label="交接人" value="接送护士"></key-value> -->
        <key-value-block
          label="交接人"
          clear
          :value="`${taskView.opTask.handoverUserName} ${taskView.opTask.handoverUserPhone}`"
        ></key-value-block>
      </template>
      <template v-if="taskView.opInfo.opSectionCode === '11'">
        <!-- <key-value label="交接人" value="复苏室护士"></key-value> -->
        <key-value-block
          label="交接人"
          clear
          :value="`${taskView.opTask.handoverUserName} ${taskView.opTask.handoverUserPhone}`"
        ></key-value-block>
      </template>
    </template>
  </TaskView>
  <EmptyPage message="当前暂无任务" v-if="!taskViewsList.length" />
  <HandleOverLay
    v-model:visible="handleOverLay.show"
    @ok="manualOk"
    v-model="handleOverLay.value"
  />
  <van-popup
    v-model:show="resuscitationOverLay.show"
    round
    teleport="#app"
    position="bottom"
  >
    <div class="itinerant-nur-to-resuscitation">
      <div class="select-title">
        <span>是否送至复苏室</span>
        <van-switch v-model="resuscitationOverLay.checked"
                    active-color="#00acf2"
                    size="24px" />
      </div>
      <div class="select-address">请选择患者术后地点</div>
      <div class="room-select">
        <div
          v-for="room in resuscitationOverLay.roomList"
          :key="room.value"
          :class="{
            'is-active': room.value === resuscitationOverLay.active,
          }"
          @click="roomSelect(room)"
        >
          {{ room.label }}
          <img src="/img/select-2.png" alt="">
        </div>
      </div>
      <div class="ihybrid-button-group">
        <van-button round class="cancel-btn" color="#FAFAFA" @click="resuscitationOverLay.show = false"> 取 消 </van-button>
        <van-button
          round
          class="btn-operation"
          @click="resuscitationOverLayHandleOk"
          color="linear-gradient(to right, #00D6FA, #00ACF2)"
        >
          确 定
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import Request from '@/service/request';
import { Dialog, Toast } from 'vant';
import { CurrentTaskViews, TaskViewItem } from '@/types/CurrentTaskViews';
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
  // beforeDiseaseName,
} from '@/utils/task-mixins';
import { ReturnData, Task } from '@/types/interface-model';
import ToastCountdown from '@/utils/toast-countdown';
import JsToFlutter from '@/utils/js-to-flutter';
import useTitleCount from '@/utils/useTitleCount';

export default defineComponent({
  name: 'ItinerantNurCurrent',
  setup() {
    const { formatTask } = useTaskMixins();
    const { updateTitleCount } = useTitleCount();
    const handleOverLay = reactive({
      show: false,
      value: '',
      row: {},
    });
    const resuscitationOverLay = reactive({
      show: false,
      checked: false,
      roomList: [
        // {
        //   label: '原科室',
        //   value: 1,
        // },
        // {
        //   label: 'ICU',
        //   value: 2,
        // },
      ],
      active: '',
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
      // beforeDiseaseName(),
    ];
    const taskViewsList = ref([]);

    const manualHandle = (taskView: any) => {
      handleOverLay.show = true;
      handleOverLay.row = taskView;
    };
    const manualOk = async () => {
      const ret: ReturnData = await Request.xhr('pickupNurseHandover', {
        userCode: handleOverLay.value,
        opInfoId: (handleOverLay.row as any)?.opInfo?.id || '',
        currentTaskId: (handleOverLay.row as any)?.opTask?.id || '',
        parentTaskId: (handleOverLay.row as any)?.opTask?.parentTaskId || '',
      });
      if (ret.code === 200) {
        ToastCountdown({
          message: '患者匹配成功，交接完成',
          seconds: 3,
        });
        handleOverLay.show = false;
        getData();
      } else {
        Toast(ret.msg as string)
      }
    };
    const codeHandle = async (row: any) => {
      const ret: string = await JsToFlutter.startScanQRCode();
      const data: ReturnData = await Request.xhr('pickupNurseHandover', {
        opInfoId: row.opInfo.id || '',
        currentTaskId: row.opTask.id || '',
        parentTaskId: row.opTask.parentTaskId || '',
        hospitalCode: ret,
      });
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
        Toast('扫码交接失败');
      }
    };

    const thirdPartyConfirm = (taskView: TaskViewItem) => {
      Dialog.confirm({
        message: '请确定手术医生和麻醉医生已到现场',
        confirmButtonText: '确 定',
        cancelButtonText: '取 消'
      })
        .then(async () => {
          const ret: ReturnData = await Request.xhr('tripartiteConfirmation', {
            opInfoId: taskView.opInfo.id || '',
            currentTaskId: taskView.opTask.id || '',
            parentTaskId: taskView.opTask.parentTaskId || '',
          });
          if (ret.code === 200) {
            getData();
          }
        })
        .catch(() => {
          console.log('Cancel');
        });
    };

    const operationBegan = (taskView: TaskViewItem) => {
      console.log(taskView);
      Dialog.confirm({
        message: '请确定手术已开始准备切皮',
        confirmButtonText: '确 定',
        cancelButtonText: '取 消'
      })
        .then(async () => {
          const ret: ReturnData = await Request.xhr('opStart', {
            opInfoId: taskView.opInfo.id || '',
            currentTaskId: taskView.opTask.id || '',
            parentTaskId: taskView.opTask.parentTaskId || '',
          });
          if (ret.code === 200) {
            getData();
          }
        })
        .catch(() => {
          console.log('Cancel');
        });
    };

    const noticeNext = async (taskView: TaskViewItem) => {
      const ret: ReturnData = await Request.xhr(
        'notifyNextOperation',
        {
          opInfoId: taskView.opInfo.id,
          currentTaskId: taskView.opTask.id || '',
          parentTaskId: taskView.opTask.parentTaskId || '',
        },
      );
      if (ret.code === 200) {
        Toast('通知下一台成功');
        getData();
      }
    };

    const resuscitationHandle = async (taskView: TaskViewItem) => {
      const ret: ReturnData = await Request.xhr('getWardList', {
        opInfoWardId: taskView.opInfo.departmentWardId
      }, `opInfoWardId=${taskView.opInfo.departmentWardId}`)
      const { data } = ret;
      resuscitationOverLay.roomList = data.map((d: { name: string, id: number }) => {
        return {
          label: d.name || '',
          value: d.id || ''
        }
      });
      resuscitationOverLay.active = (resuscitationOverLay.roomList[0] as any).value;
      resuscitationOverLay.show = true;
      resuscitationOverLay.row = taskView;
    };
    const roomSelect = (room: any) => {
      resuscitationOverLay.active = room.value;
    };

    const resuscitationOverLayHandleOk = async () => {
      const params = {
        opInfoId: (resuscitationOverLay.row as TaskViewItem).opInfo.id || '',
        currentTaskId:
          (resuscitationOverLay.row as TaskViewItem).opTask.id || '',
        parentTaskId:
          (resuscitationOverLay.row as TaskViewItem).opTask.parentTaskId || '',
        resuscitationRoom: resuscitationOverLay.checked ? 1 : 2,
        opEndWard: resuscitationOverLay.active,
      };
      const ret: ReturnData = await Request.xhr('opEnd', params);
      if (ret.code === 200) {
        Toast('手术完成');
        resuscitationOverLay.show = false;
        getData();
      } else {
        Toast(ret.msg as string)
      }
    };
    const getData = () => {
      // eslint-disable-next-line no-undef
      return Request.xhr('queryCurrentTaskList').then((r: CurrentTaskViews) => {
        if (r.code === 200) {
          taskViewsList.value = r.data.map((d) => {
            return {
              ...d,
              taskList: formatTask(d, taskList),
            };
          }) as any;
        } else {
          taskViewsList.value = [];
        }
        updateTitleCount(taskViewsList.value.length)
      });
    };
    onMounted(() => {
      getData();
    });
    return {
      handleOverLay,
      resuscitationOverLay,
      taskViewsList,
      manualHandle,
      resuscitationHandle,
      manualOk,
      codeHandle,
      roomSelect,
      thirdPartyConfirm,
      operationBegan,
      noticeNext,
      resuscitationOverLayHandleOk,
      getData,
      onMounted,
    };
  },
});
</script>

<style scoped></style>
