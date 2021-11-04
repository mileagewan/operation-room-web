<template>
  <div class="itinerant-nur-done">
    <DoneSummary :options="options" />
    <div class="done-list">
      <van-cell value="查看详情"
                v-for="i in 10"
                :key="i"
                label="手术-01室-01间"
                @click="next(i)"
                is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">江杨子正</span>
          <span>男</span>
          <span>20</span>
        </template>
      </van-cell>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'ItinerantNurDone',
  setup() {
    const router = useRouter();
    const options = reactive([
      {
        label: '送病人',
        value: 4,
      },
      {
        label: '接病人',
        value: 4,
      }
    ])
    const next = (row: any) => {
      router.push({
        path: '/surgical-detail'
      })
    }
    return {
      options,
      next
    }
  }
})
</script>

<style scoped>

</style>
