<template>
  <div class="about">
    <nav-bar @goBack="goBack" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PdaViews',

  setup(props, { emit }) {
    const router = useRouter()
    const goBack = ():void => {
      router.back()
    }
    return {
      goBack
    }
  }
})
</script>
