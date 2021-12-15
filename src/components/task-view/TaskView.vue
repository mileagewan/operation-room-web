<link rel="stylesheet" href="src/assets/styles/component/task-view.scss">
<template>
  <div class="task-view">
    <div class="task-view-header" v-if="showHeader">
      <slot name="header"></slot>
    </div>
    <div class="task-view-contet" :class="{
      'task-view-content-hide': !showHeader
    }">
      <slot name="content"></slot>
    </div>
    <a :href="`#${String(id)}`" :id="`_${id}`"></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TaskView',
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    id: {
      type: [String, Number],
      default: '1'
    }
  }
})
</script>
