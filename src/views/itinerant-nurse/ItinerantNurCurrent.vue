<template>
  <TaskView
    class="itinerant-nur-current"
    v-for="(taskView, index) in taskViewsList"
    :key="index"
    :show-header="!taskView.isClean"
    :id="taskView.patient.hospitalCode"
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
          planTime: 1,
        }"
      />
    </template>
    <template #content v-if="!taskView.isClean">
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
            :disabled="!!taskView.opInfo"
            @click="manualHandle(taskView)"
            class="default-button"
            color="#f0fafe"
          >
            人工交接
          </van-button>
          <van-button
            icon="scan"
            :disabled="!!taskView.opInfo"
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
            round
            class="default-button"
            color="rgba(0,172,242,0.05)"
            @click="broadcast(taskView)"
          >
            广播家属
          </van-button>
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
    <template #content v-else-if="taskView.isClean">
      <div class="clean-task-title">
        手术-01间-01台
      </div>
      <KeyValue label="清洁开始时间" value="16：30" />
      <div class="itinerant-flow-chart">
        <FlowChart
          :flow-data="[
            {
              title: '开始',
              icon: 'icon-kaishi',
              code: 1
            },
            {
              title: '清洁工清洁',
              icon: 'icon-shoushuzhong',
              code: 2
            },
            {
              title: '消毒',
              icon: 'icon-shoushuzhong',
              code: 3
            },
            {
              title: '消毒结束',
              icon: 'icon-jieshu',
              code: 4
            },
          ]"
          :current-code="1"
        />
      </div>
      <key-value-block>
        <template #value>
          {{ taskView.opTask.taskTipContent || "无" }}
        </template>
      </key-value-block>
      <key-value-block
        label="清洁工"
        clear
        :value="`${taskView.opTask.handoverUserName} ${taskView.opTask.handoverUserPhone}`"
      ></key-value-block>
      <template v-if="true">
        <div class="ihybrid-button-center">
          <van-button
            @click="disinfect(task)"
            round
            class="btn-operation"
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            <IconFont icon="icon-jierenwu" />
            <span>开始消毒</span>
          </van-button>
        </div>
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
<!--        <van-switch v-model="resuscitationOverLay.checked"-->
<!--                    active-color="#00acf2"-->
<!--                    size="24px" />-->
        <div class="room-checked">
          <div
            v-for="room in resuscitationOverLay.checkedList"
            :key="room.value"
            :class="{
            'is-active': room.value === resuscitationOverLay.checked,
          }"
            @click="resuscitationOverLay.checked = room.value"
          >
            {{ room.label }}
            <img src="/img/select-2.png" alt="">
          </div>
        </div>
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
  <van-popup
    v-model:show="broadcastOverLay.show"
    round
    teleport="#app"
    position="bottom"
  >
    <div class="itinerant-nur-to-resuscitation">
      <div class="select-address">广播通知家属到</div>
      <div class="room-select">
        <div
          v-for="room in broadcastOverLay.roomList"
          :key="room.value"
          :class="{
            'is-active': room.value === broadcastOverLay.active,
          }"
          @click="broadcastOverLay.active = room.value"
        >
          {{ room.label }}
          <img src="/img/select-2.png" alt="">
        </div>
      </div>
      <div class="ihybrid-button-group">
        <van-button round class="cancel-btn" color="#FAFAFA" @click="broadcastOverLay.show = false"> 取 消 </van-button>
        <van-button
          round
          class="btn-operation"
          @click="broadcastOverLayHandleOk"
          color="linear-gradient(to right, #00D6FA, #00ACF2)"
        >
          确 定
        </van-button>
      </div>
    </div>
  </van-popup>
  <van-popup
    v-model:show="disinfectOverLay.show"
    round
    teleport="#app"
    position="bottom"
  >
    <div class="itinerant-nur-to-disinfect">
      <div class="select-address">请选择消毒时间</div>
      <div class="room-select">
        <div
          v-for="room in disinfectOverLay.roomList"
          :key="room.value"
          :class="{
            'is-active': room.value === disinfectOverLay.active,
          }"
          @click="disinfectOverLay.active = room.value"
        >
          {{ room.label }}
          <img src="/img/select-2.png" alt="">
        </div>
      </div>
      <div class="ihybrid-button-group">
        <van-button round class="cancel-btn" color="#FAFAFA" @click="disinfectOverLay.show = false"> 取 消 </van-button>
        <van-button
          round
          class="btn-operation"
          @click="disinfectOverLayHandleOk"
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
    const { updateTitleCount, updateCardCacheData } = useTitleCount();
    const handleOverLay = reactive({
      show: false,
      value: '',
      row: {},
    });
    const resuscitationOverLay = reactive({
      show: false,
      checked: 2,
      checkedList: [
        {
          label: '否',
          value: 2
        },
        {
          label: '是',
          value: 1
        }
      ],
      roomList: [],
      active: '',
      row: {},
    });
    const broadcastOverLay = reactive({
      show: false,
      roomList: [
        {
          label: '原科室',
          value: 1,
        },
        {
          label: '手术室门口',
          value: 2,
        },
      ],
      active: 1,
      row: {},
    });
    const disinfectOverLay = reactive({
      show: false,
      roomList: [
        {
          label: '15分钟',
          value: 1,
        },
        {
          label: '25分钟',
          value: 2,
        },
        {
          label: '30分钟',
          value: 3,
        },
        {
          label: '40分钟',
          value: 4,
        },
        {
          label: '60分钟',
          value: 5,
        },

      ],
      active: 1,
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
    const codeHandle = async (row: any, ret:any) => {
      if (!ret) {
        ret = await JsToFlutter.startScanQRCode()
      }
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

    const broadcast = (taskView:any):void => {
      broadcastOverLay.show = true;
      broadcastOverLay.row = taskView;
    }

    const broadcastOverLayHandleOk = async (): Promise<void> => {
      const ret: ReturnData = await Request.xhr('', {});
      const { code } = ret;
      if (code === 200) {
        Toast('一统志患者家属');
        broadcastOverLay.show = false;
        getData();
      } else {
        Toast(ret.msg as string)
      }
    }

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
        resuscitationRoom: resuscitationOverLay.checked,
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

    const Events = {

      disinfect: (task:any) => {
        disinfectOverLay.show = true;
        disinfectOverLay.row = task;
      },

      disinfectOverLayHandleOk() {
        alert('开始消毒');
        disinfectOverLay.show = false;
        getData();
      }
    }
    const getData = () => {
      // eslint-disable-next-line no-undef
      return Request.xhr('queryCurrentTaskList').then((r: CurrentTaskViews) => {
        if (r.code === 200) {
          taskViewsList.value = r.data.map((d) => {
            return {
              ...d,
              isClean: false,
              taskList: formatTask(d, taskList),
            };
          }) as any;
        } else {
          taskViewsList.value = [];
        }

        updateTitleCount(taskViewsList.value.length)
        updateCardCacheData(taskViewsList.value);
      });
    };
    onMounted(() => {
      getData();
    });
    return {
      handleOverLay,
      resuscitationOverLay,
      broadcastOverLay,
      taskViewsList,
      disinfectOverLay,

      manualHandle,
      resuscitationHandle,
      manualOk,
      codeHandle,
      roomSelect,
      thirdPartyConfirm,
      broadcast,
      operationBegan,
      noticeNext,
      resuscitationOverLayHandleOk,
      broadcastOverLayHandleOk,
      getData,
      onMounted,
      ...Events,
    };
  },
});
</script>

<style scoped></style>
