<template>
  <div class="clear-task exclude-bar-height page-bg-line">
    <div class="header">
      <nav-bar @goBack="goBack" :title="title" />
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab :title="`当前任务(${todayNum})`" name="current" />
        <van-tab :title="`已完成任务(${tomorrowNum})`" name="completed" />
      </van-tabs>
    </div>
    <div class="content">
       <van-pull-refresh v-model="loadingRefresh" @refresh="onRefresh">
        <van-list
          v-model:loading="loadingList"
          :finished="finishedList"
          @load="onLoad"
          finished-text="没有更多了"
        >
          <ClearCompletedCard v-if="active==='current'" />
          <ClearTaskCard v-else-if="active==='completed'"/>
        </van-list>
        </van-pull-refresh>
    </div>
    <!-- <van-tabs v-model:active="active">
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
    </van-tabs> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref,toRefs } from 'vue'
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
    const state = reactive({
      title: '手术室',
      active: 'TODAY',
      todayNum: 0,
      tomorrowNum: 0,
      loadingRefresh: false,
      loadingList: false,
      finishedList: false
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
    // tab切换
    const onClickTab = ({ name }: any) => {
      console.log(name)
      state.active = name;
     // loadData(name)
    }
    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading1.value = true;
      onLoad();
    };
    return {
      onClickTab,
      list,
      onLoad,
      loading1,
      loading2,
      finished,
      onRefresh,
      refreshing,
      goBack,
      ...toRefs(state),
    }
  },
})
</script>
<style lang="scss" scoped>
:deep(.van-list) {
  padding: 0 24px;
}
</style>
