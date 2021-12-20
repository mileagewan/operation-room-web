<template>
  <div class="patient-detail">
    <div class="patient-name">
      <div class="patient-name-left">
        <span class="patient-pesonal-name">{{ option.name }}</span>
        <span class="patient-pesonal-sex">{{
          option.sex === 1 ? "男" : "女"
        }}</span>
        <span class="patient-pesonal-old">{{ option.age }}岁</span>
      </div>
      <div v-if="showRight">
        <van-tag
          round
          class="opration-tag-plantime"
          type="primary"
          v-if="option.planTime"
        >
          超时{{ $filters.formatTimeMin(option.planTime) }}
        </van-tag>
        <TagStatus :code="option.status" />
      </div>
      <div v-if="$slots['title-right']">
        <slot name="title-right"></slot>
      </div>
    </div>
    <div class="patient-label">
      <span class="patient-label-title">{{ option.room }}</span>
      <van-tag
        round
        class="opration-tag"
        type="primary"
        v-if="showRight"
        :class="[option.type === 2 ? 'emergency' : 'normal']"
        >
        {{ option.type === 2 ? "急诊" : "平诊" }}
      </van-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PatientDetail',
  props: {
    option: {
      type: Object,
      default: () => ({
        name: '',
        sex: '',
        age: '',
        status: '',
        type: '',
        room: '',
        planTime: 0
      }),
    },
    showRight: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped></style>
