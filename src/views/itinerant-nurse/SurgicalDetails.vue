<template>
  <div class="surgical-detail" v-if="isReady">
    <nav-bar :title="title" @goBack="goBack"/>
    <TaskView :show-header="!opTaskDTO.isClean">
      <template #header>
        <PatientDetail :option="{
          status: opTaskDTO.opInfoDTO.opSectionCode,
          name: opTaskDTO.opPatientDTO.name,
          sex: opTaskDTO.opPatientDTO.sex,
          age: opTaskDTO.opPatientDTO.age,
          type: opTaskDTO.opInfoDTO.type,
          room: opTaskDTO.opInfoDTO.descName,
        }" :show-right="false">
          <template #title-right v-if="opTaskDTO.totalOverTime">
            <span class="is-danger" >
              超时{{$filters.formatTime(opTaskDTO.totalOverTime)}}
            </span>
          </template>
        </PatientDetail>
      </template>
      <template #content v-if="!opTaskDTO.isClean">
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
      <template #content v-else>
       <div class="clean-task-title">
         {{opTaskDTO?.descName}}
       </div>
       <KeyValue label="清洁人员" :value="opTaskDTO.cleanExeUserName" />
       <KeyValue label="清洁开始时间" :value="opTaskDTO.cleanStartTime" />
       <KeyValue label="清洁结束时间" :value="opTaskDTO.cleanEndTime" />
       <KeyValue label="消毒开始时间" :value="opTaskDTO.disinfectStartTime" />
       <KeyValue label="消毒结束时间" :value="opTaskDTO.disinfectEndTime" />
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

    if (Reflect.getOwnPropertyDescriptor(opTaskDTO.value, 'isClean') === undefined) {
      router.back();
    } else {
      isReady.value = true;
      title.value = opTaskDTO.value.isClean ? '清洁消毒' : '手术详情';
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
