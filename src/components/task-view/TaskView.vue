<link rel="stylesheet" href="src/assets/styles/component/task-view.scss">
<template>
  <div class="task-view">
    <div class="task-view-header">
      <slot name="header"></slot>
    </div>
    <div class="task-view-contet">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TaskView'
})
</script>
