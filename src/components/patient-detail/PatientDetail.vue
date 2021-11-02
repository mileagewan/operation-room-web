<template>
  <div class="patient-detail">
    <div class="patient-name">
      <div class="patient-name-left">
        <span class="patient-pesonal-name">{{ name }}</span>
        <span class="patient-pesonal-sex">{{ sex }}</span>
        <span class="patient-pesonal-old">{{ age }}</span>
      </div>
      <van-tag round class="opration-tag" type="primary"> 到手术间 </van-tag>
    </div>
    <div class="patient-label">
      <span class="patient-label-title">手术-01间-01台</span>
      <van-tag round class="opration-tag" type="primary">标签</van-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'PatientDetail',
  props: {
    name: {
      type: String,
      default: '未知',
    },
    sex: {
      type: String,
      default: '未知',
    },
    age: {
      type: String,
      default: '未知',
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
