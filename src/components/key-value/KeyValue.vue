<template>
  <div class="key-value">
    <div class="key-value-label">
      <slot name="label">{{label}}</slot>
    </div>
    <div :class="{
      'key-value-value': true,
      'is-danger': danger,
      'is-important': important
    }">
      <slot name="value">{{value}}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'KeyValue',
  props: {
    label: {
      type: String,
      default: '未知'
    },
    value: {
      type: String,
      default: ''
    },
    danger: {
      type: Boolean,
      default: false
    },
    important: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>
