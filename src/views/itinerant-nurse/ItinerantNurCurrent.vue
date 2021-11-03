<template>
  <TaskView class="itinerant-nur-current">
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
        <FlowChart></FlowChart>
      </div>

      <KeyValue label="手术室接送护士" important value="阿斯顿 13800138000" />
      <KeyValue label="巡回护士电话" important value="阿斯顿 13800138000" />
    </template>
  </TaskView>
</template>

<script lang="ts">
import { TaskList } from '@/utils/mock-test-data';
import { defineComponent, onMounted, reactive } from 'vue';
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';
export default defineComponent({
  name: 'ItinerantNurCurrent',
  setup() {
    const taskList = reactive(TaskList);
    onMounted(() => {
      Request.xhr('getSso').then((r: ReturnData) => {
        console.log(r)
      })
    })
    return {
      taskList,
      onMounted
    };
  },
});
</script>

<style scoped></style>
