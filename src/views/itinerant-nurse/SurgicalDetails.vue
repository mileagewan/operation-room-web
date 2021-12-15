<template>
  <div class="surgical-detail" v-if="isReady">
    <nav-bar :title="title" @goBack="goBack"/>
    <TaskView :show-header="true">
      <template #header>
        <PatientDetail :option="{
          status: opTaskDTO.opInfoDTO.opSectionCode,
          name: opTaskDTO.opPatientDTO.name,
          sex: opTaskDTO.opPatientDTO.sex,
          age: opTaskDTO.opPatientDTO.age,
          type: opTaskDTO.opInfoDTO.type,
          room: opTaskDTO.opInfoDTO.descName,
        }" :show-right="false">
          <template #title-right>
            <span class="is-danger" >
              超时{{$filters.formatTime(opTaskDTO.totalOverTime)}}
            </span>
          </template>
        </PatientDetail>
      </template>
      <template #content v-if="true">
        <KeyValue
          v-for="(item, i) in opTaskDTO.taskList"
          :value="item.value"
          :danger="item.danger"
          :key="i"
        >
          <template #label>
            {{ item.label }}
          </template>
        </KeyValue>
      </template>
      <template #content v-else-if="false">
       <div class="clean-task-title">
         手术-01间-01台
       </div>
       <KeyValue label="清洁人员" value="江杨子正" />
       <KeyValue label="清洁开始时间" value="16：15" />
       <KeyValue label="清洁开始时间" value="16：15" />
       <KeyValue label="清洁开始时间" value="16：15" />
       <KeyValue label="清洁开始时间" value="16：15" />
      </template>
    </TaskView>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
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

export default defineComponent({
  name: 'SurgicalDetails',
  setup() {
    const router = useRouter();
    const store = useStore();

    const title = ref<string>('手术详情');
    const isReady = ref<boolean>(false);

    const list = [
      opInfoCode(),
      hospitalCode(),
      departmentName(),
      surgeonName(),
      circulatingNurseName(),
      anesthetistName(),
      anesthesiaDicCode(),
      infectType(),
      opInfoName(),
      beforeDiseaseName(),
    ];
    const { formatTask } = useTaskMixins();
    const opTaskDTO = computed(() => {
      const opTaskDTO = store.state.itinerantNur.opTaskDTO;
      return reactive({
        ...opTaskDTO,
        taskList: formatTask(opTaskDTO, list)
      });
    });
    const goBack = () => {
      router.back();
    };

    if (!opTaskDTO?.value?.opPatientDTO?.name) {
      router.back();
    } else {
      isReady.value = true;
    }
    return {
      title,
      isReady,
      opTaskDTO,
      goBack
    };
  }
});
</script>

<style scoped>

</style>
