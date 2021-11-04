<link rel="stylesheet" href="src/assets/styles/chief-coordination-nurse/surgical-summary.scss">
<template>
  <div class="surgical-summary">
    <div class="surgical-summary-item" v-for="i in 10" :key="i" @click="next({})">
      <div class="surgical-summary-item_title">手术间01</div>
      <div class="surgical-summary-item_status">
        <van-tag round class="opration-tag" type="primary"> 急诊 </van-tag>
      </div>
      <div class="surgical-summary-item_number">
        <span class="surgical-summary-item_number_status">2</span>
        <span class="surgical-summary-item_number_count">/5</span>
      </div>
      <div class="surgical-summary-item_label">手术状态</div>
      <div class="surgical-summary-item_msg">正常</div>
    </div>
  </div>
  <div class="refresh-option" @click="refresh($event)">
    <van-icon name="replay" />
    <div class="refresh-option-title">手术更新</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'SurgicalSummary',
  setup() {
    const router = useRouter();
    const refresh = (e: MouseEvent) => {
      e.stopPropagation();
      Dialog.confirm({
        title: '手术更新',
        message: '取消手术或增加急诊手术时，需要点击"手术更新"',
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    };
    const next = (row: any) => {
      router.push(({
        path: '/room-detail',
        query: row
      }))
    }
    return {
      refresh,
      next
    };
  },
});
</script>
