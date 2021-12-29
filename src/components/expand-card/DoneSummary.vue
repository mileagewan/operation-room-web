<template>
  <div class="done-summary">
    <div class="done-summary-title">
      {{ title }}
    </div>
    <div class="done-summary-list">
      <div v-for="(option, i) in options" :key="i">
        <span>
          <span class="_value">{{option.value}}</span>
          <span class="_total"
                style="color: #999"
                v-if="Reflect.has(option,'total')">/{{option.total || 0}}</span>
        </span>
        <span class="_label">{{option.label}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DoneSummary',
  props: {
    title: {
      type: String,
      default: '今日工作汇总',
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    const Reflect = window.Reflect;
    return {
      Reflect
    };
  }
});
</script>

<style scoped></style>
