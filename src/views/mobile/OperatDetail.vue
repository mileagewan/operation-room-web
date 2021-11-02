<template>
  <div>
    <surgical-progress />
  </div>
</template>
<script lang="ts">
import SurgicalProgress from './components/SurgicalProgress.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OperatDetail',
  components: {
    SurgicalProgress
  },
  setup() {
    const aa = '1'
  },
})
</script>
