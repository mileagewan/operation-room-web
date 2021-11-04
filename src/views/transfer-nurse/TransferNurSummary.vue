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
      <!--      送手术-->
      <template v-if="c.code === 4">
        <div class="ihybrid-button-center">
          <van-button icon="scan"
                      @click="codeHandle"
                      round
                      color="linear-gradient(to right, #00D6FA, #00ACF2)">
            接任务
          </van-button>
        </div>

      </template>

    </template>
  </TaskView>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { curentData } from '@/utils/mock-test-data';
import { Toast } from 'vant';
import Request from '../../service/request';
import { ReturnData } from '@/types/interface-model';
export default defineComponent({
  name: 'TransferNurSummary',
  setup() {
    const current = reactive(curentData.filter(c => {
      return [4].indexOf(c.code) > -1
    }))

    const codeHandle = () => {
      Toast('接任务成功');
    }

    onMounted(() => {
      Request.xhr('getSso').then((r: ReturnData) => {
        console.log(r)
      })
    })
    return {
      current,
      codeHandle,
      onMounted
    };
  },
})
</script>

<style scoped>

</style>
