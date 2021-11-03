<template>
  <div class="clear-task exclude-bar-height page-bg-line">
    <nav-bar @goBack="goBack" :title="data.title" />
    <van-tabs v-model:active="active">
      <van-tab title="当前任务(1)">
        <van-pull-refresh
          v-model="loading1"
          @refresh="onRefresh"
          class="page-container-with-bar"
          :head-height="80"
        >
          <van-list v-model:loading="loading2" :finished="finished" @load="onLoad">
            <ClearCompletedCard />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已完成任务">
        <van-pull-refresh
          v-model="loading1"
          @refresh="onRefresh"
          class="page-container-with-bar"
          :head-height="80"
        >
          <van-list v-model:loading="loading2" :finished="finished" @load="onLoad">
            <ClearTaskCard />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import ClearTaskCard from './components/ClearTaskCard.vue'
import ClearCompletedCard from './components/ClearCompletedCard.vue'

export default defineComponent({
  name: 'ClearTask',
  components: {
    ClearTaskCard,
    ClearCompletedCard
  },
  setup() {
    const loading1 = ref(false)
    const loading2 = ref(false)
    const list = ref<any>([]);
    const finished = ref(false);
    const refreshing = ref(false);
    const active = ref(0)
    const data = reactive({
      title: '手术室'
    })
    const router = useRouter()
    const goBack = (): void => {
      router.back()
    }
    const onLoad = () => {
      setTimeout(() => {
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }
        loading2.value = false;

        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading1.value = true;
      onLoad();
    };
    return {
      list,
      onLoad,
      loading1,
      loading2,
      finished,
      onRefresh,
      refreshing,
      active,
      goBack,
      data
    }
  },
})
</script>
<style lang="scss" scoped>
:deep(.van-list) {
  padding: 0 24px;
}
</style>
