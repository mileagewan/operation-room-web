<template>
  <div class="expand-card" ref="expandCardRef">
    <div
      class="expand-card-content"
      ref="expandContentRef"
      :class="{ expaned: expandStatus }"
    >
      <PatientDetail :option="option" />

      <div class="expand-card-list">
        <slot></slot>
      </div>
    </div>
    <div
      class="expand-card-todo"
      :class="{ opened: expandStatus }"
      @click="expandStatus = !expandStatus"
    >
      <span>{{ `${expandStatus ? "收起" : "展开"}详情` }}</span>
      <!-- <van-icon v-if="!expandStatus" name="arrow-down" />
      <van-icon v-else name="arrow-up" /> -->
      <IconFont icon="icon-zhankaixiangqing" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ExpandCard',
  props: {
    option: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    const expandStatus = ref<boolean>(false);
    const expandContentRef = ref<HTMLElement | null>(null);
    const expandCardRef = ref<HTMLElement | null>(null);
    return {
      expandStatus,
      expandContentRef,
      expandCardRef,
    };
  },
});
</script>

<style scoped></style>
