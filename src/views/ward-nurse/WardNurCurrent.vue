<template>
  <TaskView class="itinerant-nur-current"
            v-for="(c, index) in current"
            :key="index"
  >
    <template #header>
      <PatientDetail :option="{status: c.code}" />
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
        <template #value>
          无
        </template>
      </KeyValueBlock>
      <template v-if="c.code === 3">
        <div class="ihybrid-button-center">
          <van-button round
                      @click="callNurse"
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            呼叫护工
          </van-button>
        </div>
      </template>
      <template v-if="c.code === 4">
        <KeyValueBlock clear
                       label="交接人"
                       value="力度 13800138000" />
      </template>
      <template v-if="c.code === 15">
        <div class="ihybrid-button-group" >
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
        </div>

      </template>
    </template>
  </TaskView>
  <HandleOverLay v-model:visible="handleOverLay.show"
                 @ok="manualOk"
                 v-model="handleOverLay.value"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { curentData } from '@/utils/mock-test-data';
import { Toast } from 'vant';
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';
export default defineComponent({
  name: 'WardNurCurrent',
  setup() {
    const handleOverLay = reactive({
      show: false,
      value: ''
    });

    const current = reactive(curentData)
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

    const callNurse = () => {
      Toast('呼叫护工成功')
    }

    onMounted(() => {
      Request.xhr('getSso').then((r: ReturnData) => {
        console.log(r)
      })
    })
    return {
      current,
      handleOverLay,
      manualHandle,
      manualOk,
      codeHandle,
      callNurse,
      onMounted
    };
  },
})
</script>

<style scoped>

</style>
