<template>
  <TaskView
    class="itinerant-nur-current"
    v-for="(c, index) in current"
    :key="index"
  >
    <template #header>
      <PatientDetail
        :option="{
          status: c.code,
          name: '四个名字',
          sex: '男',
          age: '99',
          type: '急诊',
          room: '手术-01间-01台',
        }"
      />
    </template>
    <template #content>
      <KeyValue
        v-for="(vi, ii) in c.opInfo"
        :value="vi.value"
        :danger="vi.danger"
        :key="ii"
      >
        <template #label>
          {{ vi.label }}
        </template>
      </KeyValue>
      <KeyValueBlock>
        <template #value> 无 </template>
      </KeyValueBlock>
      <template v-if="c.code === 3">
        <div class="ihybrid-button-center">
          <van-button
            round
            @click="callNurse"
            color="linear-gradient(to right, #00D6FA, #00ACF2)"
          >
            呼叫护工
          </van-button>
        </div>
      </template>
      <template v-if="c.code === 4">
        <KeyValueBlock clear label="交接人" value="力度 13800138000" />
      </template>
      <template v-if="c.code === 15">
        <div class="ihybrid-button-group">
          <van-button
            round
            @click="manualHandle"
            class="default-button"
            color="#f0fafe"
          >
            人工交接
          </van-button>
          <van-button
            icon="scan"
            @click="codeHandle"
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
import { curentData } from '@/utils/mock-test-data';
import { Toast } from 'vant';
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';
import JsToFlutter from '@/utils/js-to-flutter';
import ToastCountdown from '@/utils/toast-countdown';
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
export default defineComponent({
  name: 'WardNurCurrent',
  setup() {
    const handleOverLay = reactive({
      show: false,
      value: '',
    });

    const current = ref([]);
    const manualHandle = () => {
      handleOverLay.show = true;
    };
    const manualOk = () => {
      console.log(handleOverLay);
      handleOverLay.show = false;
    };
    const codeHandle = () => {
      JsToFlutter.startScanQRCode().then((res) => {
        console.log(res);
        // TODO 调接口推进下一阶段
      });
      ToastCountdown({
        message: '患者匹配成功，交接完成',
        seconds: 3,
      });
    };

    const callNurse = () => {
      Toast('呼叫护工成功');
    };

    onMounted(() => {
      Request.xhr('getSso').then((r: ReturnData) => {
        console.log(r);
      });
      setTimeout(() => {
        current.value = curentData.filter((c) => {
          return [2, 3, 4, 14, 15].includes(c.code);
        }) as any;
      }, 1000);
    });
    const getData = () => {
      // eslint-disable-next-line no-undef
      Request.xhr('queryCurrentTaskList').then((r: CurrentTaskViews) => {
        // const { code, data } = r;
        // if (code === 200) {
        //   const taskViews = data.map((d) => {
        //     return {
        //       ...d,
        //       taskList: formatTask(data, taskList)
        //     }
        //   })
        // }
        console.log(r)
        // taskViewsList.value = testdata.map((d) => {
        //   return {
        //     ...d,
        //     taskList: formatTask(d, taskList)
        //   }
        // }) as any;
      })
    }
    getData()
    return {
      getData,
      current,
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
