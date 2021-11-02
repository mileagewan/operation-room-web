<template>
  <div class="operat-room exclude-bar-height">
    <nav-bar @goBack="goBack" :title="data.title" />
    <van-pull-refresh
      v-model="loading"
      @refresh="onRefresh"
      class="page-container"
      :head-height="80"
    >
      <oprat-room-card></oprat-room-card>
    </van-pull-refresh>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import OpratRoomCard from './components/OpratRoomCard.vue'

export default defineComponent({
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
