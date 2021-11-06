<template>
  <div class="clear-task-card">
    <div class="card-title">
      <span>{{info.taskStartTime}}清洁任务</span>
      <span>{{info.departmentWardName}}-{{info.oproomSubName}}</span>
    </div>
    <div class="item-warp">
      <div class="item">
        <div class="title">手术名称</div>
        <div class="text">
          <span>{{ dateTime }}</span>
          <span>{{ info.opName }}</span>
        </div>
      </div>
      <div class="item">
        <div class="title">任务发起人</div>
        <div class="text">{{ info.initiatorUserName }}</div>
      </div>
      <div class="item">
        <div class="title">清洁护工</div>
        <div class="text">{{ info.receiveUserName }}</div>
      </div>
      <div class="item">
        <div class="title">完成时间</div>
        <div class="text">{{ info.taskEndTime }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { getMonthDay } from '@/utils/date-formt'

export default defineComponent({
  name: 'ClearTaskCard',
  props: {
    data: {
      type: Object,
      default: () => { }
    }
  },
  setup(props) {
    const info = ref<any>(props.data)
    const dateTime = computed(() => {
      const _MonthDay = info.value.startDate ? getMonthDay(info.value.startDate) : ''
      const _week = info.value.week ? ('(' + info.value.week + ')') : ''
      const _startTime = info.value.startTime ? info.value.startTime : ''
      const _endTime = info.value.endTime ? info.value.endTime : ''
      return _MonthDay + _week + _startTime + '-' + _endTime
    })
    return {
      dateTime,
      info
    }
  },
})
</script>
<style lang="scss" scoped>
.clear-task-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 12px 24px 0px rgba(217, 220, 221, 0.5);
  padding: 30px 24px 24px;
  .card-title {
    padding-bottom: 27px;
    span {
      height: 48px;
      font-size: 36px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #000000;
      line-height: 48px;
      & + span {
        margin-left: 24px;
      }
    }
  }
  .item-warp {
    .item {
      display: flex;
      padding: 12px 0;
      .title {
        width: 120px;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #999999;
      }
      .text {
        margin-left: 89px;
        display: flex;
        flex-direction: column;
        font-size: 24px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
</style>
