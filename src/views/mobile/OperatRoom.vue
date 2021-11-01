<template>
  <div>
    <nav-bar @goBack="goBack" :title="data.title" />
    <oprat-room-card></oprat-room-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import OpratRoomCard from './components/OpratRoomCard.vue'
export default defineComponent({
  components: {
    OpratRoomCard
  },
  setup() {
    const data = reactive({
      title: '手术间01间'
    })
    const router = useRouter()
    const goBack = (): void => {
      router.back()
    }
    return {
      goBack,
      data
    }
  },
})
</script>
