<template>
  <div class="operat-detail exclude-bar-height page-bg-line page-padding">
    <nav-bar @goBack="goBack" :title="data.title" />
    <van-pull-refresh
      class="page-container"
      v-model="loading"
      @refresh="onRefresh"
      :head-height="80"
    >
      <TaskView>
        <template #header>
          <div class="date-title">
            <div>10月20日(周五) 08:00-09:00</div>
            <div>胸腔镜下肺大泡切除术</div>
          </div>
          <oprat-info>
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
          </oprat-info>
        </template>
        <template #content>
          <surgical-progress />
        </template>
      </TaskView>
    </van-pull-refresh>
  </div>
</template>
<script lang="ts">
import SurgicalProgress from './components/SurgicalProgress.vue'
import OpratInfo from './components/OpratInfo.vue'
import { useRouter } from 'vue-router'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'OperatDetail',
  components: {
    SurgicalProgress,
    OpratInfo
  },
  setup() {
    const loading = ref(false)
    const data = reactive({
      title: '手术详情'
    })
    const router = useRouter()
    const goBack = (): void => {
      router.back()
    }
    const onRefresh = () => {
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    }
    return {
      loading,
      onRefresh,
      goBack,
      data
    }
  },
})
</script>
<style lang="scss" scoped>
.operat-detail {
  .date-title {
    font-size: 36px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    color: #000000;
    margin-bottom: 24px;
  }
  :deep(.task-view-header) {
    padding: 24px;
    .info-content.info-right {
      padding-top: 48px;
      margin-left: 11px;
    }
  }
}
</style>
