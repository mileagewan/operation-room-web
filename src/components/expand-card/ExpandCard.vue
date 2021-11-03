<template>
  <div class="expand-card" ref="expandCardRef">
    <div class="expand-card-content" ref="expandContentRef">
      <PatientDetail />

      <div class="expand-card-list">
        <KeyValue
          v-for="i in 10"
          :key="i"
          label="手术号"
          value="213123123123"
        />
      </div>
    </div>
    <div class="expand-card-todo" @click="expandStatus = !expandStatus">
      <span>{{ `${expandStatus ? "收起" : "展开"}详情` }}</span>
      <van-icon v-if="!expandStatus" name="arrow-down" />
      <van-icon v-else name="arrow-up" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ExpandCard',
  setup() {
    const expandStatus = ref<boolean>(false);
    const expandContentRef = ref<HTMLElement | null>(null);
    const expandCardRef = ref<HTMLElement | null>(null);
    watch(
      expandStatus,
      (value) => {
        if (!expandCardRef.value || !expandContentRef.value) {
          return;
        }
        const dpr = window.devicePixelRatio >= 2 ? 2 : 1;
        if (value) {
          const scrollHeight = (expandContentRef.value as any)
            .scrollHeight as number;
          (expandCardRef.value as any).style.height = `${scrollHeight + 36}px`;
        } else {
          (expandCardRef.value as any).style.height = `${460 / dpr}px`;
        }
      },
      { immediate: true }
    );
    return {
      expandStatus,
      expandContentRef,
      expandCardRef,
    };
  },
});
</script>

<style scoped></style>
