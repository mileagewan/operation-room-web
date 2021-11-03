<link rel="stylesheet" href="../assets/styles/task-view.scss">
<template>
  <div class="task-view">
    <div class="task-view-header">
      <slot name="header"></slot>
      <div class="task-view-line">
        <div class="task-line-block-left"></div>
        <div class="task-line-block-right"></div>
      </div>
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
