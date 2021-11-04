<template>
  <div
    :class="{
        'key-value-block' : true,
        'is-clear': clear
        }">
    <div class="key-value-block-label">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="key-value-block-value">
      <div>
        <slot name="value">{{ value }}</slot>
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
      default: '任务描述',
    },
    value: {
      type: String,
      default: '无',
    },
    clear: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
