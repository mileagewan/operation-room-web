<template>
  <ul class="task-list">
    <li v-for="(item, index) in list" :key="index">
      <TaskListItem />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'TaskList',
  setup() {
    // TODO list 可以用prop传进来，也可以封闭到本组件内部去请求后端数据
    const list: any = ref([]);
    list.value = new Array(10).fill('').map((item, index) => {
      return {
        name: 'user' + (index + 1),
      };
    });
    const onLoad = () => {
      console.log('onLoad');
    };
    return {
      list,
    };
  },
});
</script>

<style lang="scss" scoped>
.task-list {
  margin: 0 24px;
  padding: 0 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 12px 24px 0px rgba(217, 220, 221, 0.5);
}
</style>
