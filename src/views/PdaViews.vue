<template>
  <div class="pda-views">
    <nav-bar @goBack="goBack" />
    <van-tabs v-model:active="active">
      <van-tab title="标签 1">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <TaskView>
           <template #header>
             <div>title</div>
           </template>
           <template #content>
             <div>content</div>
           </template>
          </TaskView>

        </van-pull-refresh>
      </van-tab>
      <van-tab title="标签 2">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          标签 1
        </van-pull-refresh>
      </van-tab>
      <van-tab title="标签 3">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          标签 1
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PdaViews',

  setup(props, { emit }) {
    const loading = ref<boolean>(false)
    const active = ref<number>(0)
    const router = useRouter()
    const goBack = ():void => {
      router.back()
    }
    const onRefresh = (): void => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
    return {
      loading,
      active,
      goBack,
      onRefresh
    }
  }
})
</script>
