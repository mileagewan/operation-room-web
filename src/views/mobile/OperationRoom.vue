<template>
  <div class="operation-room exclude-bar-height page-bg-line">
    <nav-bar @goBack="goBack" :title="data.title" />
    <van-tabs v-model:active="active">
      <van-tab title="今日手术(4)">
        <van-pull-refresh
          v-model="loading1"
          @refresh="onRefresh"
          class="page-container-with-bar"
          :head-height="80"
        >
          <van-list v-model:loading="loading2" :finished="finished" @load="onLoad">
            <oprat-room-card>
              <template #left-content>
                <div class="item">
                  <span class="title">手术室</span>
                  <span class="text">二区域 - 手术室05</span>
                </div>
                <div class="item">
                  <span class="title">主刀医生</span>
                  <span class="text">黄志浩</span>
                </div>
                <div class="item">
                  <span class="title">麻醉医生</span>
                  <span class="text">陈潜</span>
                </div>
                <div class="item">
                  <span class="title">患者性别</span>
                  <span class="text">男</span>
                </div>
              </template>
              <template #right-content>
                <div class="item">
                  <span class="title">巡回护士</span>
                  <span class="text">杨森</span>
                </div>
                <div class="item">
                  <span class="title">器械护士</span>
                  <span class="text">陈涛</span>
                </div>
                <div class="item">
                  <span class="title">患者年龄</span>
                  <span class="text">55岁</span>
                </div>
              </template>
            </oprat-room-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="明日手术(5)">
        <van-pull-refresh
          v-model="loading1"
          @refresh="onRefresh"
          class="page-container-with-bar"
          :head-height="80"
        >
          <van-list v-model:loading="loading2" :finished="finished" @load="onLoad">
            <oprat-room-card>
              <template #left-content>
                <div class="item">
                  <span class="title">手术室</span>
                  <span class="text">二区域 - 手术室05</span>
                </div>
                <div class="item">
                  <span class="title">主刀医生</span>
                  <span class="text">黄志浩</span>
                </div>
                <div class="item">
                  <span class="title">麻醉医生</span>
                  <span class="text">陈潜</span>
                </div>
                <div class="item">
                  <span class="title">患者性别</span>
                  <span class="text">男</span>
                </div>
              </template>
              <template #right-content>
                <div class="item">
                  <span class="title">巡回护士</span>
                  <span class="text">杨森</span>
                </div>
                <div class="item">
                  <span class="title">器械护士</span>
                  <span class="text">陈涛</span>
                </div>
                <div class="item">
                  <span class="title">患者年龄</span>
                  <span class="text">55岁</span>
                </div>
              </template>
            </oprat-room-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import OpratRoomCard from './components/OpratRoomCard.vue'

export default defineComponent({
  name: 'OperationRoom',
  components: {
    OpratRoomCard,
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
.operation-room {
  :deep(.operat-room-card) {
    .oprat-info-warp {
      .info-content {
        &.info-right {
          margin-left: 12px;
          padding-top: 54px;
        }
      }
    }
  }
}
</style>
