<template>
  <div class="task-list-item">
    <div class="task-item">
      <a :href="`#${task.patient.hospitalCode}`" :id="`_${task.patient.hospitalCode}`"></a>
      <div class="flex flex-between header">
        <div class="flex-main">
          <span class="name">{{ task.patient.name }}</span>
          <span
            >{{ task.patient.sex === 1 ? "男" : "女" }}
            {{ task.patient.age }}岁</span
          >
        </div>
        <span class="task">{{
          task.listingType === 1 ? "送病人" : "接病人"
        }}</span>
      </div>
      <div class="flex">
        <div class="flex-main">{{ task.opDescName }}</div>
        <!-- TODO目的地 -->
        <span class="to-department">
          {{ task.opEndWardName || "" }}
        </span>
      </div>
      <div class="flex info">
        <div class="info-item">
          <label>住院号</label>
          <span>{{ task.patient.hospitalCode }}</span>
        </div>
        <div class="info-item">
          <label>用时</label>
          <span>{{ $filters.formatTime(task.taskTime) }}</span>
        </div>
        <div class="info-plantime">
          超时3分10秒
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
        patient: {},
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
