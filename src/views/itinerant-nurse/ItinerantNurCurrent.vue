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
        type: taskView.patient.type,
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
        <FlowChart :flow-data="flowData"></FlowChart>
      </div>
      <key-value-block>
        <template #value>
          {{taskView.opInfo.taskTipContent || '无'}}
        </template>
      </key-value-block>
      <div class="ihybrid-button-group">
        <template v-if="taskView.opInfo.opSectionCode === 6">
          <van-button round
                      @click="manualHandle"
                      class="default-button"
                      color="#f0fafe">
            人工交接
          </van-button>
          <van-button icon="scan"
                      @click="codeHandle"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            扫码交接
          </van-button>
        </template>
        <template v-else-if="taskView.opInfo.opSectionCode === 7">
          <van-button icon="passed"
                      @click="thirdPartyConfirm(taskView)"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            三方确认
          </van-button>
        </template>
        <template v-else-if="taskView.opInfo.opSectionCode === 8">
          <van-button icon="pause-circle-o"
                      @click="operationBegan(taskView)"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            手术开始
          </van-button>
        </template>
        <template v-else-if="taskView.opInfo.opSectionCode === 9">
          <van-button round
                      @click="noticeNext(taskView)"
                      class="default-button"
                      color="#f0fafe">
            通知下一台术前准备
          </van-button>
          <van-button icon="passed"
                      @click="resuscitationHandle"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            手术完成
          </van-button>
        </template>
      </div>
      <template v-if="taskView.opInfo.opSectionCode === 10">
        <key-value label="交接人" value="接送护士"></key-value>
      </template>
      <template v-if="taskView.opInfo.opSectionCode === 11">
        <key-value label="交接人" value="复苏室护士"></key-value>
      </template>
    </template>
  </TaskView>
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
                    color="linear-gradient(to right, #00D6FA, #00ACF2)">
          确定
        </van-button>
      </div>
    </div>

  </van-popup>
</template>

<script lang="ts">
import { testdata, FlowData2 } from '@/utils/mock-test-data';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import Request from '@/service/request';
import { Toast } from 'vant';
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
import { Task } from '@/types/interface-model';

export default defineComponent({
  name: 'ItinerantNurCurrent',
  setup() {
    const { formatTask } = useTaskMixins()
    const handleOverLay = reactive({
      show: false,
      value: ''
    });
    const resuscitationOverLay = reactive({
      show: false,
      checked: false,
      roomList: [
        {
          label: '原料室',
          value: 1
        },
        {
          label: 'ICU',
          value: 2
        },
        {
          label: '原料室',
          value: 3
        }
      ],
      active: 1
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
    const flowData = reactive(FlowData2);
    const taskViewsList = ref([])

    const manualHandle = () => {
      handleOverLay.show = true
    }
    const manualOk = () => {
      console.log(handleOverLay)
      handleOverLay.show = false
    }
    const codeHandle = () => {
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
          Toast.clear();
        }
      }, 1000);
    }

    const thirdPartyConfirm = (taskView: TaskViewItem) => {
      console.log(taskView)
      Toast('三方确认')
    }

    const operationBegan = (taskView: TaskViewItem) => {
      console.log(taskView)
      Toast('手术开始')
    }

    const noticeNext = (taskView: TaskViewItem) => {
      console.log(taskView)
      Toast('通知下一台术前准备')
    }

    const resuscitationHandle = () => {
      resuscitationOverLay.show = true
    }
    const roomSelect = (room: any) => {
      resuscitationOverLay.active = room.value
    }

    const getData = () => {
      // eslint-disable-next-line no-undef
      Request.xhr('itinerGetcurrenttask').then((r: CurrentTaskViews) => {
        // const { code, data } = r;
        // if (code === 200) {
        //   const taskViews = data.map((d) => {
        //     return {
        //       ...d,
        //       taskList: formatTask(data, taskList)
        //     }
        //   })
        // }
        taskViewsList.value = testdata.map((d) => {
          return {
            ...d,
            taskList: formatTask(d, taskList)
          }
        }) as any;
        console.log(taskViewsList.value)
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      handleOverLay,
      resuscitationOverLay,
      flowData,
      taskViewsList,
      manualHandle,
      manualOk,
      resuscitationHandle,
      codeHandle,
      roomSelect,
      thirdPartyConfirm,
      operationBegan,
      noticeNext,
      onMounted
    };
  },
});
</script>

<style scoped></style>
