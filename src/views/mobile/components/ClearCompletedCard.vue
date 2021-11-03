<template>
  <div class="clear-completed-card">
    <ClearTaskCard />
    <div class="btn-group">

    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ClearTaskCard from './ClearTaskCard.vue'

export default defineComponent({
  name: 'ClearCompletedCard',
  components: {
    ClearTaskCard
  },
  setup() {

  },
})
</script>
<style lang="scss" scoped>
.clear-completed-card {
  background: #ffffff;
  border-radius: 0px 0px 12px 12px;
}
</style>
