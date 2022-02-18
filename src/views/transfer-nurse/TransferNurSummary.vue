<template>
  <!-- 转运护工 任务池 -->
  <EmptyPage message="当前暂无任务发布" v-if="!taskList.length && !loading" />
  <TaskView
    class="itinerant-nur-current"
    v-for="(task, index) in taskList"
    :key="index"
  >
    <template #header>
      <PatientDetail
        :option="{
          status: task.opInfo.opSectionCode,
          name: task.patient.name,
          sex: task.patient.sex,
          age: task.patient.age,
          type: task.opInfo.type,
          room: task.opInfo.opDescName,
        }"
      />
    </template>
    <template #content>
      <KeyValue
        v-for="(item, i) in task.infoItems"
        :value="item.value"
        :danger="item.danger"
        :key="i"
      >
        <template #label>
          {{ item.label }}
        </template>
      </KeyValue>
      <KeyValue label="目的地" v-if="String(task.opInfo.opSectionCode) === '14'">
        <template #value>
          {{task.opTask?.destinationName || '无'}}
        </template>
      </KeyValue>
      <KeyValueBlock>
        <template #value>  {{ task.opTask.taskTipContent || "无" }} </template>
      </KeyValueBlock>
      <KeyValueBlock
          clear
          label="发布人"
          :value="`${task.opTask.publisherUserName} ${task.opTask.publisherUserPhone}`"
        />
      <!-- 接任务操作 -->
      <div class="ihybrid-button-center">
        <van-button
          @click="recoveryTask(task)"
          round
          class="btn-operation"
          color="linear-gradient(to right, #00D6FA, #00ACF2)"
        >
          <IconFont icon="icon-jierenwu" />
          <span>接任务</span>
        </van-button>
      </div>
    </template>
  </TaskView>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { Toast } from 'vant';
import Request from '../../service/request';
import { CurrentTaskViews } from '@/types/CurrentTaskViews';
import useTaskMixins, {
  circulatingNurseName,
  departmentName,
  hospitalCode,
  infectType,
  opInfoCode,
} from '../../utils/task-mixins';
import { useStore } from 'vuex';
import { SET_ACTIVE_MUTATION } from '@/store/types/mutation-types';
import useTitleCount from '@/hooks/useTitleCount';
export default defineComponent({
  name: 'TransferNurSummary',
  setup() {
    const { updateTitleCount } = useTitleCount() as any;
    const store = useStore();
    const { formatTask } = useTaskMixins();
    const infoItems = [
      opInfoCode(),
      hospitalCode(),
      departmentName(),
      infectType(),
      circulatingNurseName(),
    ];
    const taskList: any = ref([]);
    const loading = ref(false);
    const getData = () => {
      loading.value = true;
      return Request.xhr('queryTaskPoolList')
        .then((r: CurrentTaskViews) => {
          if (r.data) {
            taskList.value = r.data.map((d: any) => {
              return {
                ...d,
                infoItems: formatTask(d, infoItems),
              };
            });
          } else {
            taskList.value = [];
          }
          updateTitleCount(taskList.value.length)
        })
        .finally(() => {
          loading.value = false;
        });
    };

    // 接任务操作
    const recoveryTask = (task: any) => {
      const data = {
        opInfoId: task.opInfo.id,
        currentTaskId: task.opTask.id,
        parentTaskId: task.opTask.parentTaskId,
      };
      Request.xhr('recoveryTask', data).then((res: any) => {
        console.log(res);
        if (res.code === 200) {
          Toast('接任务成功');
          getData();
          store.commit(SET_ACTIVE_MUTATION, 0);
        }
      });
    };

    let timer: number;
    onMounted(() => {
      getData();
      timer = setInterval(() => {
        getData();
      }, 30000);
    });
    onUnmounted(() => {
      clearInterval(timer);
    });
    return {
      loading,
      taskList,
      recoveryTask,
      onMounted,
      getData,
    };
  },
});
</script>

<style scoped></style>
