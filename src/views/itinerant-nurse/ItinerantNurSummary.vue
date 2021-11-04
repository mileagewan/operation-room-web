<template>
  <!-- 任务汇总 -->
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text=""
    @load="onLoad"
    class="page-padding list"
  >
    <van-cell v-for="(item, index) in list" :key="index">
      <ExpandCard />
    </van-cell>
  </van-list>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ItinerantNurSummary',
  setup() {
    const loading = ref(false);
    const finished = ref(true);
    const list = ref([]);
    list.value = new Array(10).fill('').map((item, index) => {
      return {
        name: 'user' + (index + 1),
      };
    });
    // console.log(list);
    const onLoad = () => {
      console.log('onLoad');
    };
    return {
      loading,
      finished,
      list,
      onLoad,
    };
  },
});
</script>
