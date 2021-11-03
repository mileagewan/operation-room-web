<template>
  <div class="room-detail">
    <nav-bar :title="row.title" @goBack="goBack" />
    <div class="room-detail-content">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <ExpandCard />
        <ExpandCard />
        <ExpandCard />
        <ExpandCard />
        <ExpandCard />
        <ExpandCard />
      </van-pull-refresh>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'RoomDetail',
  setup() {
    const router = useRouter();
    const row = reactive({
      title: '手术间01间'
    })
    const loading = ref<boolean>(false)
    const onRefresh = () => {
      loading.value = false
    }
    const goBack = () => {
      router.back()
    }
    return {
      row,
      loading,
      onRefresh,
      goBack
    }
  }
})
</script>
