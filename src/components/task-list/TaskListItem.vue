<template>
  <div class="task-list-item">
    <div class="task-item">
      <div class="flex flex-between header">
        <div class="flex-main">
          <span class="name">{{task.name}}</span>
          <span>男 25岁</span>
        </div>
        <span class="status">准点完成</span>
      </div>
      <div class="flex">
        <div class="flex-main">手术-01间-01台</div>
        <span class="task">送病人</span>
      </div>
      <div class="flex info">
        <div class="info-item">
          <label>住院号</label>
          <span>2021789789</span>
        </div>
        <div class="info-item">
          <label>用时</label>
          <span>10分钟</span>
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
      default: () => ({}),
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
    .status {
      color: #3bdc37;
    }
  }
  .task {
    color: #999999;
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
