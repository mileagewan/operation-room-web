<template>
  <div class="task-list-item">
    <div class="task-item">
      <div class="flex flex-between header">
        <div class="flex-main">
          <span class="name">{{ task.patient.name }}</span>
          <span>{{ task.patient.sex === 1 ? "男" : "女" }} 25岁</span>
        </div>
        <span class="task">{{ task.listingTypes === 1 ? "送病人" : "接病人" }}</span>
      </div>
      <div class="flex">
        <div class="flex-main">{{ task.opInfo.oproomName }}</div>
        <span class="to-department">ICU</span>
      </div>
      <div class="flex info">
        <div class="info-item">
          <label>住院号</label>
          <span>{{ task.patient.hospitalCode }}</span>
        </div>
        <div class="info-item">
          <label>用时</label>
          <span>{{ task.taskTime }}</span>
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
        opInfo: {}
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
  .header {
    margin-bottom: 18px;
    .name {
      margin-right: 12px;
      font-size: 36px;
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
    .info-item {
      label {
        margin-right: 24px;
        color: #999999;
      }
      + .info-item {
        margin-left: 100px;
      }
    }
  }
}
</style>
