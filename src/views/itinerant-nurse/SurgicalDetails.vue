<template>
  <div class="surgical-detail">
    <nav-bar :title="title" @goBack="goBack"/>
    <TaskView>
      <template #header>
        <PatientDetail/>
      </template>
      <template #content>
        <KeyValue
          v-for="(vi, ii) in taskList"
          :value="vi.value"
          :danger="vi.danger"
          :key="ii"
        >
          <template #label>
            {{ vi.label }}
          </template>
        </KeyValue>
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
      </template>
    </TaskView>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TaskList } from '@/utils/mock-test-data';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'SurgicalDetails',
  setup() {
    const router = useRouter();
    const store = useStore();
    const title = ref<string>('手术详情')
    debugger
    const opTaskDTO = computed(() => store.state.itinerantNur.opTaskDTO)
    console.log(opTaskDTO.value)
    const taskList = reactive(TaskList);

    const goBack = () => {
      router.back()
    }
    return {
      title,
      taskList,
      goBack
    }
  }
})
</script>

<style scoped>

</style>
