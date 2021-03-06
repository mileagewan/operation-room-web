<template v-if="isReady">
  <TaskView
    class="itinerant-nur-current"
    v-for="(taskView, index) in taskViewsList"
    :key="index"
    :show-header="!taskView.isClean"
    :id="taskView?.opPatientDTO?.hospitalCode"
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
          :flow-data="taskView.flowDatas"
          :current-code="taskView.currentCode"
        />
      </div>
      <template v-if="taskView.opInfoDTO.opSectionCode !== '5'">
        <key-value-block>
          <template #value>
            {{ taskView.description || "无" }}
          </template>
        </key-value-block>
      </template>
      <template v-if="['7', '8', '9'].includes(taskView.opInfoDTO.opSectionCode)">
        <key-value-block label="患者家属"
                         clear
                         class="broadcast-personal-key-value">
          <template #value>
            <div class="broadcast-personal">
              <span class="broadcast-personal-name">
                {{`${taskView.opPatientDTO.familyPhone}`}}
              </span>
              <span class="broadcast-personal-todo">
                  <ToTime :time="taskView.clickCountdownTime"
                          :id="taskView.opTaskDTO?.id"
                          @clickPublic="broadcast(taskView)">
                    <IconFont icon="icon-guangbo"></IconFont>
                    <span>广播家属</span>
                  </ToTime>
              </span>
            </div>

          </template>
        </key-value-block>
      </template>
      <template v-if="taskView.opInfoDTO.opSectionCode === '5'">
          <key-value-block
            label="交接人"
            clear
            v-if="taskView.opTaskDTO.handUserName"
          >
            <template #value>
              {{`${taskView.opTaskDTO.handUserName || '-'} ${taskView.opTaskDTO.handUserPhone || '-'}`}}
            </template>
          </key-value-block>
        <div class="key-value-block-empty" v-else></div>
      </template>
      <template v-if="taskView.opInfoDTO.opSectionCode === '6'">
        <key-value-block
          label="交接人"
          clear
        >
          <template #value>
            {{`${taskView.opTaskDTO.handUserName} ${taskView.opTaskDTO.handUserPhone}`}}
          </template>
        </key-value-block>
        <div class="ihybrid-button-group">
          <van-button
            round
            :disabled="taskView.opRoomStatus !== 1"
            @click="manualHandle(taskView)"
            class="default-button"
            color="#f0fafe"
          >
            人工交接
          </van-button>
          <van-button
            icon="scan"
            :disabled="taskView.opRoomStatus !== 1"
            class="btn-operation"
            @click="codeHandle(taskView)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            扫码交接
          </van-button>
        </div>
      </template>
      <template v-else-if="taskView.opInfoDTO.opSectionCode === '7'">
        <div class="ihybrid-button-center">
          <van-button
            class="btn-operation"
            @click="thirdPartyConfirm(taskView)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            <IconFont icon="icon-sanfangqueren"/>
            三方确认
          </van-button>
        </div>
      </template>
      <template v-else-if="taskView.opInfoDTO.opSectionCode === '8'">
        <div class="ihybrid-button-center">
          <van-button
            class="btn-operation"
            @click="operationBegan(taskView)"
            round
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            <IconFont icon="icon-shoushukaishi1"/>
            手术开始
          </van-button>
        </div>
      </template>
      <template v-else-if="taskView.opInfoDTO.opSectionCode === '9'">
        <div class="ihybrid-button-group">
          <van-button
            round
            :disabled="taskView.nextOpStatus === 1"
            v-if="taskView.nextOpStatus !== 2"
            @click="noticeNext(taskView)"
            class="default-button"
            color="#f0fafe"
          >
            {{ taskView.nextOpStatus === 1 ? '已通知下一台手术' : '通知下一台术前准备' }}
          </van-button>
          <van-button
            class="btn-operation"
            @click="resuscitationHandle(taskView)"
            round
            :disabled="taskView.nextOpStatus === 0 "
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            <IconFont icon="icon-shoushuwancheng"/>
            手术完成
          </van-button>
        </div>
      </template>
      <template v-if="taskView.opInfoDTO.opSectionCode === '10'">
        <!-- <key-value label="交接人" value="接送护士"></key-value> -->
        <key-value-block
          label="交接人"
          clear
          :value="`${taskView.opTaskDTO.handUserName} ${taskView.opTaskDTO.handUserPhone}`"
        >
        </key-value-block>
      </template>
      <template v-if="taskView.opInfoDTO.opSectionCode === '11'">
        <!-- <key-value label="交接人" value="复苏室护士"></key-value> -->
        <key-value-block
          label="交接人"
          clear
          :value="`${taskView.opTaskDTO.handUserName} ${taskView.opTaskDTO.handUserPhone}`"
        ></key-value-block>
      </template>
    </template>
    <template #content v-else-if="taskView.isClean">
      <div class="clean-task-title">
        {{ taskView.descName }}
      </div>
      <template v-if="[1,2].includes(taskView.cleanDisinfectStatus)">
        <KeyValue label="清洁开始时间"
                  v-if="taskView.cleanStartTime"
                  :value="taskView.cleanStartTime"/>
        <KeyValue label="清洁结束时间"
                  v-if="taskView.cleanEndTime"
                  :value="taskView.cleanEndTime"/>
      </template>
      <template v-if="[3,4].includes(taskView.cleanDisinfectStatus)">
        <KeyValue label="层流净化开始时间"
                  v-if="taskView.disinfectStartTime"
                  :value="taskView.disinfectStartTime"/>
        <KeyValue label="净化结束时间"
                  v-if="taskView.disinfectEndTime"
                  :value="taskView.disinfectEndTime"/>
      </template>

      <div class="itinerant-flow-chart">
        <FlowChart :flow-data="taskView.flowDatas"
                   :current-code="taskView.currentCode"/>
      </div>
      <key-value-block>
        <template #value>
          {{ taskView.description || "无" }}
        </template>
      </key-value-block>
      <key-value-block
        label="清洁工"
        clear
        v-if="taskView.cleanDisinfectStatus <= 2"
        :value="`${taskView.cleanExeUserName} ${taskView.cleanExeUserPhone}`"
      ></key-value-block>
      <template v-if="taskView.cleanDisinfectStatus === 2">
        <div class="ihybrid-button-center">
          <van-button
            @click="disinfect(taskView)"
            round
            class="btn-operation"
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            <IconFont icon="icon-xiaodu"/>
            <span> 开始消毒</span>
          </van-button>
        </div>
      </template>
    </template>
  </TaskView>
  <EmptyPage message="当前暂无任务" v-if="!taskViewsList.length"/>
  <HandleOverLay
    v-model:visible="handleOverLay.show"
    @ok="manualOk"
    v-model="handleOverLay.value"
  />

  <!--  去复苏室-->
  <van-popup
    v-model:show="resuscitationOverLay.show"
    round
    teleport="#app"
    position="bottom"
  >
    <div class="itinerant-nur-to-resuscitation">
      <div class="select-title">
        <span>是否送至复苏室</span>
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
        <van-button round class="cancel-btn" color="#FAFAFA" @click="resuscitationOverLay.show = false"> 取 消
        </van-button>
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

  <!-- 广播通知 -->
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
          :key="room.goToPlaceCode"
          :class="{
            'is-active': room.goToPlaceCode === broadcastOverLay.active,
          }"
          @click="broadcastOverLay.active = room.goToPlaceCode"
        >
          {{ room.goToPlaceName }}
          <img src="/img/select-2.png" alt="">
        </div>
      </div>
      <div class="ihybrid-button-group">
        <van-button round class="cancel-btn" color="#FAFAFA" @click="broadcastOverLay.show = false"> 取 消</van-button>
        <van-button
          round
          class="btn-operation"
          :disabled="broadcastOverLay.disabled"
          @click="broadcastOverLayHandleOk"
          color="linear-gradient(to right, #00D6FA, #00ACF2)"
        >
          确 定
        </van-button>
      </div>
    </div>
  </van-popup>

  <!--  消毒时间选择-->
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
        <van-button round class="cancel-btn"
                    color="#FAFAFA"
                    @click="disinfectOverLay.show = false"> 取 消
        </van-button>
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
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, nextTick } from 'vue';
import Request from '@/service/request';
import { Dialog, Toast } from 'vant';
import { TaskItem } from '@/types/CurrentTaskViews';
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
import useTitleCount from '@/hooks/useTitleCount';
import { findNode } from '@/utils/utils';
import RetData from '@/types/RetData';
import useTimeInterval from '@/hooks/useTimeInterval';
import useTimeOut from "@/hooks/useTimeOut";

export default defineComponent({
  name: 'ItinerantNurCurrent',
  setup() {
    const { ctx }: any = getCurrentInstance();
    const { formatTask } = useTaskMixins();
    const { updateTitleCount, updateCardCacheData } = useTitleCount();
    const { interval } = useTimeInterval();
    const { latter } = useTimeOut();

    const isReady = ref(true);
    const handleOverLay = reactive({
      show: false,
      value: '',
      row: {},
    });
    const resuscitationOverLay = reactive({
      show: false,
      checked: 0,
      checkedList: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ],
      roomList: [],
      room: {},
      active: '',
      row: {},
    });
    const broadcastOverLay = reactive({
      show: false,
      disabled: false,
      roomList: [],
      active: 1,
      row: {},
    });
    const disinfectOverLay = reactive({
      show: false,
      roomList: [
        {
          label: '15分钟',
          value: 15,
        },
        {
          label: '25分钟',
          value: 25,
        },
        {
          label: '30分钟',
          value: 30,
        },
        {
          label: '40分钟',
          value: 40,
        },
        {
          label: '60分钟',
          value: 60,
        },

      ],
      active: 15,
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
      const ret: ReturnData = await Request.xhr('flowReverInputNext', {
        workId: handleOverLay.value,
        opInfoId: (handleOverLay.row as any)?.opInfoDTO?.id || '',
        opTaskId: (handleOverLay.row as any)?.opTaskDTO?.id || '',
      });
      if (ret.code === 200) {
        ToastCountdown({
          message: '患者匹配成功，交接完成',
          seconds: 3,
        });
        handleOverLay.show = false;
        getData();
      } else {
        Toast(ret.msg as string);
      }
    };
    const codeHandle = async (row: any, ret: any) => {
      if (!ret) {
        ret = await JsToFlutter.startScanQRCode();
      }
      const data: ReturnData = await Request.xhr('flowReverScanNext', {
        opInfoId: row.opInfoDTO.id || '',
        opTaskId: row.opTaskDTO.id || '',
        hospitalCode: ret,
        stepFlag: 1,
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
        Toast(data.msg as string);
      }
    };

    const thirdPartyConfirm = (taskView: TaskItem) => {
      Dialog.confirm({
        message: '请确定手术医生和麻醉医生已到现场',
        confirmButtonText: '确 定',
        cancelButtonText: '取 消'
      })
        .then(async () => {
          const ret: ReturnData = await Request.xhr(
            'flowReverNormalNext',
            {
              opTaskId: taskView.opTaskDTO.id || ''
            });
          if (ret.code === 200) {
            getData();
          }
        })
        .catch(() => {
          console.log('Cancel');
        });
    };

    const broadcast = async (taskView: any): Promise<void> => {
      const ret = await Request.xhr('broadcastData', {
        opInfoId: taskView.opPatientDTO?.beforeDepartmentWardId,
      });
      broadcastOverLay.roomList = ret?.data;
      broadcastOverLay.active = (broadcastOverLay as any).roomList[0]?.goToPlaceCode;
      broadcastOverLay.show = true;
      broadcastOverLay.row = taskView;
    };

    const broadcastOverLayHandleOk = async (): Promise<void> => {
      if (broadcastOverLay.disabled) {
        return
      }
      broadcastOverLay.disabled = true;
      const room = findNode(broadcastOverLay.roomList, (b: any) => {
        return b.goToPlaceCode === broadcastOverLay.active;
      });
      const ret: ReturnData = await Request.xhr('broadcastMsg', {
        deptId: (broadcastOverLay as any)?.row?.opInfoDTO?.opDepartmentId,
        opInfoId: (broadcastOverLay as any)?.row.opInfoDTO?.id,
        goToPlace: room?.goToPlaceName,
        patientName: (broadcastOverLay as any)?.row?.opPatientDTO?.name
      });
      const { code, data, msg } = ret;
      if (code === 200 && data) {
        await getData();
        Toast(data.promptContent as string);
      } else {
        Toast(msg as string);
      }
      await latter(() => {
        // 手机端更新存在不稳定的异常
        try {
          ctx.$nextTick(() => {
            broadcastOverLay.show = false;
            broadcastOverLay.disabled = false;
          })
        } catch (e) {
          broadcastOverLay.show = false;
          broadcastOverLay.disabled = false;
        }
      }, 500)
    };

    const operationBegan = (taskView: TaskItem) => {
      console.log(taskView);
      Dialog.confirm({
        message: '请确定手术已开始准备切皮',
        confirmButtonText: '确 定',
        cancelButtonText: '取 消'
      })
        .then(async () => {
          const ret: ReturnData = await Request.xhr('flowReverNormalNext',
            {
              opTaskId: taskView.opTaskDTO.id || '',
            });
          if (ret.code === 200) {
            getData();
          }
        })
        .catch(() => {
          console.log('Cancel');
        });
    };

    const noticeNext = async (taskView: TaskItem) => {
      const ret: ReturnData = await Request.xhr(
        'nextOpInfo',
        {
          opInfoId: taskView.nextOpInfoId,
          opTaskId: taskView.opTaskDTO?.id,
        },
      );
      if (ret.code === 200) {
        Toast('通知下一台成功');
        getData();
      } else {
        Toast(ret.msg as string);
      }
    };

    const resuscitationHandle = async (taskView: TaskItem) => {
      const ret: ReturnData = await Request.xhr('getIcuWardList', {
        departmentWardId: taskView.opPatientDTO.beforeDepartmentWardId
      });
      const { data } = ret;
      resuscitationOverLay.roomList = data.map((d: { name: string, id: number }) => {
        return {
          label: d.name || '',
          value: d.id || '',
          ...d
        };
      });
      resuscitationOverLay.active = (resuscitationOverLay.roomList[0] as any).value;
      resuscitationOverLay.room = resuscitationOverLay.roomList[0];
      resuscitationOverLay.show = true;
      resuscitationOverLay.row = taskView;
    };
    const roomSelect = (room: any) => {
      resuscitationOverLay.active = room.value;
      resuscitationOverLay.room = room;
    };

    const resuscitationOverLayHandleOk = async () => {
      const params = {
        opTaskId:
          (resuscitationOverLay.row as TaskItem).opTaskDTO.id || '',
        recoverFlag: resuscitationOverLay.checked,
        afterDepartmentId: (resuscitationOverLay.room as any).departmentId,
        afterDepartmentWardId: (resuscitationOverLay.room as any).id,
      };
      const ret: ReturnData = await Request.xhr('flowReverNextRecover', params);
      if (ret.code === 200) {
        Toast('手术完成');
        resuscitationOverLay.show = false;
        await getData();
        isReady.value = false;
        nextTick(() => {
          isReady.value = true;
        })
      } else {
        Toast(ret.msg as string);
      }
    };

    const Events = {

      disinfect: (task: any) => {
        disinfectOverLay.show = true;
        disinfectOverLay.row = task;
      },

      async disinfectOverLayHandleOk() {
        const ret: RetData<any> = await Request.xhr('flowReverNextDisinfect', {
          opTaskId: (disinfectOverLay.row as any).taskId,
          minute: disinfectOverLay.active
        });
        const { code, msg } = ret;
        if (code === 200) {
          disinfectOverLay.show = false;
        } else {
          Toast(msg);
        }
        getData();
      }
    };

    const queryOpRoomNextOpDetailsList = (opInfoIds:any): Promise<any> => {
      return Request.xhr('queryOpRoomNextOpDetailsList', {
        opInfoIds,
      });
    };

    const queryNotifyFamilyDetailsList = (opInfoIds:any): Promise<any> => {
      return Request.xhr('queryNotifyFamilyDetailsList', {
        opInfoIds,
      });
    };

    const getData = () => {
      return Promise.all([
        Request.xhr('queryCurrentOpTaskList'),
        Request.xhr('queryCurrentOpCleanTask')
      ]).then(async (r: Array<any>) => {
        const [normalTask, cleanTask]: any[] = r;
        if (normalTask.code === 200) {
          const opInfoIds: number[] = normalTask.data?.map((d: any) => {
            return d.opInfoDTO.id;
          }) || [];
          const [retNext, retFamily] = await Promise.all([
            queryOpRoomNextOpDetailsList(opInfoIds),
            queryNotifyFamilyDetailsList(opInfoIds),
          ]);
          normalTask.data.forEach((d:any) => {
            const retFamilyNoity = findNode(retFamily.data, (ds: any) => {
              return ds.opInfoId === d.opInfoDTO?.id;
            });
            d.clickCountdownTime = retFamilyNoity?.clickCountdownTime || 0;
            d.currentMsgListQueueNum = retFamilyNoity?.currentMsgListQueueNum;
            // 获取当前通知的队列， 大于5，可以点击
            if (d.currentMsgListQueueNum > 5) {
              d.clickCountdownTime = 0;
            }
            const nextOpInfoDetail = findNode(retNext.data || [], (n:any) => {
              return n.lastOpInfoId === d.opInfoDTO?.id;
            }) || {};
            d.nextOpStatus = nextOpInfoDetail.nextOpStatus;
            d.nextOpInfoId = nextOpInfoDetail.opInfoId;
          });

          taskViewsList.value = normalTask.data.map((d: any) => {
            const { taskFlowPointDetailsDTOList }: any = d;
            const point = findNode(taskFlowPointDetailsDTOList, (d: any) => {
              return d.pointStatus === 1;
            });
            return {
              ...d,
              isClean: false,
              description: point.description,
              taskList: formatTask(d, taskList),
              overTime: point.overTime,
              flowDatas: taskFlowPointDetailsDTOList.map((p: any) => {
                return {
                  ...p,
                  title: p.pointName,
                  icon: '',
                  code: p.pointCode
                };
              }),
              currentCode: point.pointCode
            };
          }) as any;

          if (cleanTask.data) {
            cleanTask.data = cleanTask.data.map((d: any) => {
              const { taskFlowPointDetailsDTOList }: any = d;
              const point = findNode(taskFlowPointDetailsDTOList, (d: any) => {
                return d.pointStatus === 1;
              });
              return {
                ...d,
                isClean: true,
                description: point.description,
                flowDatas: taskFlowPointDetailsDTOList.map((p: any) => {
                  return {
                    ...p,
                    title: p.pointName,
                    icon: '',
                    code: p.pointCode
                  };
                }),
                currentCode: point.pointCode
              };
            }) as string[];

            (taskViewsList as any).value.push(...cleanTask.data);
          }
        } else {
          taskViewsList.value = [];
        }
        updateTitleCount(taskViewsList.value.length);
        updateCardCacheData(taskViewsList.value);
        console.log(taskViewsList.value)

        try {
          ctx.$forceUpdate();
        } catch (e) {
          console.log(e);
        }
      });
    };
    onMounted(() => {
      getData();
      interval(getData);
    });
    return {
      isReady,
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
