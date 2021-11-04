<template>
  <i class="iconfont" :class="icon"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './iconfont.css';
export default defineComponent({
  name: 'IconFont',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
});
</script>

<style></style>
