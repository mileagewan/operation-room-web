<template>
  <TaskView class="itinerant-nur-current"
            v-for="c in code"
            :key="c"
  >
    <template #header>
      <PatientDetail />
    </template>
    <template #content>
      <KeyValue
        v-for="(v, i) in taskList"
        :value="v.value"
        :danger="v.danger"
        :key="i"
      >
        <template #label>
          {{ v.label }}
        </template>
      </KeyValue>
      <div class="itinerant-flow-chart">
        <FlowChart :flow-data="flowData"></FlowChart>
      </div>
      <key-value-block>
        <template #value>
          阿水淀粉阿水淀粉阿水淀粉阿水淀粉
          阿水淀粉阿水淀粉阿水淀粉阿水淀粉
          阿水淀粉阿水淀粉阿水淀粉阿水淀粉
          阿水淀粉阿水淀粉阿水淀粉阿水淀粉
          阿水淀粉阿水淀粉阿水淀粉阿水淀粉
          阿水淀粉阿水淀粉阿水淀粉阿水淀粉
          阿水淀粉阿水淀粉阿水淀粉阿水淀粉
          阿水淀粉阿水淀粉阿水淀粉阿水淀粉
        </template>
      </key-value-block>
      <div class="ihybrid-button-group" >
        <template v-if="c === 6">
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
        <template v-else-if="c === 7">
          <van-button icon="passed"
                      @click="codeHandle"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            三方确认
          </van-button>
        </template>
        <template v-else-if="c === 8">
          <van-button icon="pause-circle-o"
                      @click="codeHandle"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            手术开始
          </van-button>
        </template>
        <template v-else-if="c === 9">
          <van-button round
                      @click="manualHandle"
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
      <template v-if="c === 10">
        <key-value label="交接人" value="接送护士"></key-value>
      </template>
      <template v-if="c === 11">
        <key-value label="交接人" value="复苏室护士"></key-value>
      </template>
    </template>
  </TaskView>
  <van-popup
    v-model:show="handleOverLay.show"
    round
    class="handle-overlay"
    position="bottom"
    teleport=".itinerant-nur-current"
  >
    <div class="handle-overlay_title">
      请输入交接人工号
    </div>
    <van-field v-model="handleOverLay.value" />
    <div class="ihybrid-button-group" >
      <van-button round
                  @click="manualHandle"
                  class="default-button"
                  color="#f0fafe">
        取消
      </van-button>
      <van-button @click="codeHandle"
                  round
                  color="linear-gradient(to right, #00D6FA, #00ACF2)">
        确定
      </van-button>
    </div>
  </van-popup>
  <van-popup
    v-model:show="resuscitationOverLay.show"
    round
    position="bottom"
    teleport=".itinerant-nur-current"
  >
    <div class="itinerant-nur-to-resuscitation">
      <div class="select-title">
        <span>是否送至复苏室</span>
        <van-switch v-model="resuscitationOverLay.checked"  size="24px"/>
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
          {{room.label}}
        </div>
      </div>
      <div class="ihybrid-button-group" >
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
import { TaskList, FlowData2 } from '@/utils/mock-test-data';
import { defineComponent, onMounted, ref, reactive } from 'vue';
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';
import { Toast } from 'vant';
export default defineComponent({
  name: 'ItinerantNurCurrent',
  setup() {
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
    const taskList = reactive(TaskList);
    const flowData = reactive(FlowData2);
    const code = reactive([
      6, 7, 8, 9, 10, 11
    ])
    const manualHandle = () => {
      handleOverLay.show = true
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
    const resuscitationHandle = () => {
      resuscitationOverLay.show = true
    }
    const roomSelect = (room: any) => {
      resuscitationOverLay.active = room.value
    }
    onMounted(() => {
      Request.xhr('getSso').then((r: ReturnData) => {
        console.log(r)
      })
    })
    return {
      handleOverLay,
      resuscitationOverLay,
      taskList,
      flowData,
      code,
      manualHandle,
      resuscitationHandle,
      codeHandle,
      roomSelect,
      onMounted
    };
  },
});
</script>

<style scoped></style>
