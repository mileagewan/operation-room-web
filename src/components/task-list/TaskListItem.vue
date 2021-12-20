<template>
  <div class="task-list-item">
    <div class="task-item">
      <a :href="`#${task.opPatientDTO.hospitalCode}`" :id="`_${task.opPatientDTO.hospitalCode}`"></a>
      <div class="flex flex-between header">
        <div class="flex-main">
          <span class="name">{{ task.opPatientDTO.name }}</span>
          <span
            >{{ task.opPatientDTO.sex === 1 ? "男" : "女" }}
            {{ task.opPatientDTO.age }}岁</span
          >
        </div>
        <span class="task">{{
          task.receiveFlag === 1 ? "接病人" : "送病人"
        }}</span>
      </div>
      <div class="flex">
        <div class="flex-main">{{ task.opInfoDTO?.descName }}</div>
        <!-- TODO目的地 -->
        <span class="to-department">
          {{ task.opPatientDTO?.afterDepartmentName || "" }}
        </span>
      </div>
      <div class="flex info">
        <div class="info-item">
          <label>住院号</label>
          <span>{{ task.opPatientDTO.hospitalCode }}</span>
        </div>
        <div class="info-item">
          <label>用时</label>
          <span>{{ $filters.formatTime(task.exeTime) }}</span>
        </div>
        <div class="info-plantime">
          超时{{ $filters.formatTime(task.totalOverTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TaskListItem',
  props: {
    task: {
      type: Object,
      default: () => ({
        opPatientDTO: {},
        opInfo: {},
      }),
    },
  },
});
</script>

<style lang="scss" scoped>
.task-list-item {
  padding-top: 38px;
  padding-bottom: 48px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 24px;
  color: #333;

  .flex-main {
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .header {
    margin-bottom: 18px;
    align-items: flex-end;
    line-height: 1;
    .name {
      margin-right: 12px;
      font-size: 36px;
      font-weight: 600;
      color: #000;
    }
    .task {
      color: #999999;
    }
  }
  .to-department {
    color: #999;
  }
  .info {
    margin-top: 48px;
    align-items: center;
    .info-item {
      label {
        margin-right: 24px;
        color: #999999;
      }
      + .info-item {
        margin-left: 102px;
      }
    }

    .info-plantime {
      font-size: 24px;
      font-weight: var(--ihybrid--important-weight);
      color: #ff0000;
      margin-left: 8px;
    }
  }
}
</style>
