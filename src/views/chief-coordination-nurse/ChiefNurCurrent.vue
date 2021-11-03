<template>
  <TaskView>
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
      <KeyValue label="状态节点">
        <template #value>
          <FlowChart></FlowChart>
        </template>
      </KeyValue>
      <KeyValue label="手术室接送护士" important value="阿斯顿 13800138000" />
      <KeyValue label="巡回护士电话" important value="阿斯顿 13800138000" />
    </template>
  </TaskView>
</template>

<script>
import { TaskList } from '@/utils/mock-test-data'
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'ChiefNurCurrent',
  setup() {
    const taskList = reactive(TaskList)
    return {
      taskList
    }
  }
});
</script>

<style scoped></style>
