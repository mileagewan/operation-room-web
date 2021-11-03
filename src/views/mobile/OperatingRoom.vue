<template>
  <div class="operat-room exclude-bar-height page-bg-line page-padding">
    <nav-bar @goBack="goBack" :title="data.title" />
    <van-pull-refresh
      v-model="loading"
      @refresh="onRefresh"
      class="page-container"
      :head-height="80"
    >
      <oprat-room-card>
        <template #left-content>
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
    </van-pull-refresh>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import OpratRoomCard from './components/OpratRoomCard.vue'

export default defineComponent({
  name: 'OperatingRoom',
  components: {
    OpratRoomCard,

  },
  setup() {
    const loading = ref(false)
    const data = reactive({
      title: '手术间01间'
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
</style>
