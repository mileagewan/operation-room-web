<template>
  <div class="key-value-block">
    <div class="key-value-block-label">
      <slot name="label">{{label}}</slot>
    </div>
    <div class="key-value-block-value">
      <div>
        <slot name="value">{{value}}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'KeyValueBlock',
  props: {
    label: {
      type: String,
      default: '未知'
    },
    value: {
      type: String,
      default: ''
    },
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>
