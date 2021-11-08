<template>
  <ul class="task-list">
    <li v-for="(item, index) in taskList" :key="index">
      <TaskListItem :task="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
export default defineComponent({
  name: 'TaskList',
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    // TODO list 用prop传进来的数据
    // const { taskList }: any = toRefs(props);
    // console.log(taskList);

    const list: any = ref([]);

    // list.value = new Array(10).fill('').map((item, index) => {
    //   return {
    //     opInfo: {},
    //     patient: {
    //       name: 'user' + (index + 1),
    //     },
    //   };
    // });
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
