<template>
  <div class="patient-detail">
    <div class="patient-name">
      <div class="patient-name-left">
        <span class="patient-pesonal-name">{{ option.name }}</span>
        <span class="patient-pesonal-sex">{{ option.sex }}</span>
        <span class="patient-pesonal-old">{{ option.age }}</span>
      </div>
      <TagStatus :code="option.status" />
    </div>
    <div class="patient-label">
      <span class="patient-label-title">{{ option.room }}</span>
      <van-tag
        round
        class="opration-tag"
        type="primary"
        :class="[option.type === 2 ? 'emergency' : 'normal']"
        >{{ option.type === 2 ? "急诊" : "平珍" }}</van-tag
      >
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
        name: '四个名字',
        sex: '男',
        age: '99',
        status: 16,
        type: 2,
        room: '手术-01间-01台',
      }),
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped></style>
