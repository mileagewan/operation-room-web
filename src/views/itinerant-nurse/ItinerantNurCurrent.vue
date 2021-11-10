<template>
  <TaskView class="itinerant-nur-current"
            v-for="(taskView, index) in taskViewsList"
            :key="index"
  >
    <template #header>
      <PatientDetail :option="{
        status: taskView.opInfo.opSectionCode,
        name: taskView.patient.name,
        sex: '男',
        age: '99',
        type: taskView.opInfo.type,
        room: taskView.opInfo.oproomSubName,
      }"/>
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
        <FlowChart :flow-data="taskView.operatingStatusList" :current-code="taskView.currentOperatingStatus" />
      </div>
      <key-value-block>
        <template #value>
          {{taskView.opInfo.taskTipContent || '无'}}
        </template>
      </key-value-block>
      <div class="ihybrid-button-group">
        <template v-if="taskView.opInfo.opSectionCode === '6' ">
          <van-button round
                      @click="manualHandle(taskView)"
                      class="default-button"
                      color="#f0fafe">
            人工交接
          </van-button>
          <van-button icon="scan"
                      @click="codeHandle(taskView)"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            扫码交接
          </van-button>
        </template>
        <template v-else-if="taskView.opInfo.opSectionCode === '7'">
          <van-button icon="passed"
                      @click="thirdPartyConfirm(taskView)"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            三方确认
          </van-button>
        </template>
        <template v-else-if="taskView.opInfo.opSectionCode === '8'">
          <van-button icon="pause-circle-o"
                      @click="operationBegan(taskView)"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            手术开始
          </van-button>
        </template>
        <template v-else-if="taskView.opInfo.opSectionCode === '9'">
          <van-button round
                      :disabled="taskView.notifyNextOperation === 2"
                      v-if="taskView.notifyNextOperation !== 3"
                      @click="noticeNext(taskView)"
                      class="default-button"
                      color="#f0fafe">
            通知下一台术前准备
          </van-button>
          <van-button icon="passed"
                      @click="resuscitationHandle(taskView)"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            手术完成
          </van-button>
        </template>
      </div>
      <template v-if="taskView.opInfo.opSectionCode === '10'">
        <key-value label="交接人" value="接送护士"></key-value>
      </template>
      <template v-if="taskView.opInfo.opSectionCode === 11">
        <key-value label="交接人" value="复苏室护士"></key-value>
      </template>
    </template>
  </TaskView>
  <EmptyPage message="当前暂无任务" v-if="!taskViewsList.length" />
  <HandleOverLay v-model:visible="handleOverLay.show"
                 @ok="manualOk"
                 v-model="handleOverLay.value"/>
  <van-popup
    v-model:show="resuscitationOverLay.show"
    round
    position="bottom"
  >
    <div class="itinerant-nur-to-resuscitation">
      <div class="select-title">
        <span>是否送至复苏室</span>
        <van-switch v-model="resuscitationOverLay.checked" size="24px"/>
      </div>
      <div class="select-address">
        请选择患者术后地点
      </div>
      <div class="room-select">
        <div v-for="room in resuscitationOverLay.roomList"
             :key="room.value"
             :class="{
               'is-active': room.value === resuscitationOverLay.active
             }"
             @click="roomSelect(room)">
          {{ room.label }}
        </div>
      </div>
      <div class="ihybrid-button-group">
        <van-button round
                    class="cancel-btn"
                    color="#FAFAFA">
          取消
        </van-button>
        <van-button round
                    @click="resuscitationOverLayHandleOk"
                    color="linear-gradient(to right, #00D6FA, #00ACF2)">
          确定
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
  beforeDiseaseName
} from '@/utils/task-mixins';
import { ReturnData, Task } from '@/types/interface-model';
import ToastCountdown from '@/utils/toast-countdown';
import JsToFlutter from '@/utils/js-to-flutter';

export default defineComponent({
  name: 'ItinerantNurCurrent',
  setup() {
    const { formatTask } = useTaskMixins()
    const handleOverLay = reactive({
      show: false,
      value: '',
      row: {}
    });
    const resuscitationOverLay = reactive({
      show: false,
      checked: false,
      roomList: [
        {
          label: '原科室',
          value: 1
        },
        {
          label: 'ICU',
          value: 2
        }
      ],
      active: 1,
      row: {}
    })
    const taskList:Task[] = [
      opInfoCode(),
      hospitalCode(),
      departmentName(),
      surgeonName(),
      circulatingNurseName(),
      anesthetistName(),
      anesthesiaDicCode(),
      infectType(),
      opInfoName(),
      beforeDiseaseName()
    ];
    const taskViewsList = ref([])

    const manualHandle = (taskView:any) => {
      handleOverLay.show = true
      handleOverLay.row = taskView
    }
    const manualOk = async () => {
      const ret: ReturnData = await Request.xhr('pickupNurseHandover', {
        userCode: handleOverLay.value,
        opInfoId: (handleOverLay.row as any)?.opInfo?.id || '',
        currentTaskId: (handleOverLay.row as any)?.opTask?.id || '',
        parentTaskId: (handleOverLay.row as any)?.opTask?.parentTaskId || '',
      })
      if (ret.code === 200) {
        ToastCountdown({
          message: '患者匹配成功，交接完成',
          seconds: 3,
        });
        handleOverLay.show = false;
        getData()
      }
    }
    const codeHandle = async (row:any) => {
      const ret: string = await JsToFlutter.startScanQRCode();
      const data: ReturnData = await Request.xhr('pickupNurseHandover', {
        opInfoId: row.opInfo.id || '',
        currentTaskId: row.opTask.id || '',
        parentTaskId: row.opTask.parentTaskId || '',
        hospitalCode: ret,
      })
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
            getData()
            Toast.clear();
          }
        }, 1000);
      } else {
        Toast('扫码交接失败')
      }
    }

    const thirdPartyConfirm = (taskView: TaskViewItem) => {
      Dialog.confirm({
        message: '请确定手术医生和麻醉医生已到现场',
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
          console.log('Cancel')
        });
    }

    const operationBegan = (taskView: TaskViewItem) => {
      console.log(taskView)
      Dialog.confirm({
        message: '请确定手术已开始准备切片',
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
          console.log('Cancel')
        });
    }

    const noticeNext = async (taskView: TaskViewItem) => {
      const ret: ReturnData = await Request.xhr('notifyNextOperation', {
        opInfoId: taskView.opInfo.id
      }, `opInfoId=${taskView.opInfo.id}`)
      if (ret.code === 200) {
        Toast('通知下一台成功');
        getData()
      }
    }

    const resuscitationHandle = (taskView: TaskViewItem) => {
      resuscitationOverLay.show = true
      resuscitationOverLay.row = taskView
    }
    const roomSelect = (room: any) => {
      resuscitationOverLay.active = room.value
    }

    const resuscitationOverLayHandleOk = async () => {
      const params = {
        opInfoId: (resuscitationOverLay.row as TaskViewItem).opInfo.id || '',
        currentTaskId: (resuscitationOverLay.row as TaskViewItem).opTask.id || '',
        parentTaskId: (resuscitationOverLay.row as TaskViewItem).opTask.parentTaskId || '',
        resuscitationRoom: resuscitationOverLay.checked ? 1 : 2,
        postoperativeLocation: resuscitationOverLay.active
      }
      const ret: ReturnData = await Request.xhr('opEnd', params)
      if (ret.code === 200) {
        Toast('手术完成')
        resuscitationOverLay.show = false;
        getData()
      }
    }
    const getData = () => {
      // eslint-disable-next-line no-undef
      Request.xhr('queryCurrentTaskList').then((r: CurrentTaskViews) => {
        if (r.code === 200) {
          taskViewsList.value = r.data.map((d) => {
            return {
              ...d,
              taskList: formatTask(d, taskList)
            }
          }) as any;
        }
      })
    }
    onMounted(() => {
      getData()
    })
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
      onMounted
    };
  },
});
</script>

<style scoped></style>
