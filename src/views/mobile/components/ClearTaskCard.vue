<template>
  <div class="clear-task-card">
    <div class="card-title">
      <span>{{ getHourMinute(info.publishTime) }} 清洁任务</span>
      <span>{{ info.opDepartmentName }}-{{ info.opRoomName }}</span>
    </div>
    <div class="item-warp">
      <div class="item">
        <div class="title">手术名称</div>
        <div class="text">
          <span>{{ getMonthDayWeek(info.publishTime) }}</span>
          <span>{{ info.opName }}</span>
        </div>
      </div>
      <div class="item">
        <div class="title">任务发起人</div>
        <div class="text">{{ info.publishUserName }}</div>
      </div>
      <div class="item">
        <div class="title">清洁护工</div>
        <div class="text">{{ info.exeUserName }}</div>
      </div>
      <div class="item" v-if="tabsActive.active == 'UNDO'">
        <div class="title">状态</div>
        <div class="text time-out">超时{{ info.overTime }}分钟</div>
      </div>
      <div class="item" v-if="tabsActive.active == 'DONE'">
        <div class="title">完成时间</div>
        <div class="text">{{ info.taskEndTime }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, inject } from "vue";
import { getMonthDay } from "@/utils/date-formt";
import dayjs from "dayjs";

export default defineComponent({
  name: "ClearTaskCard",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const info = ref<any>(props.data);
    const dateTime = computed(() => {
      const _MonthDay = info.value.startDate
        ? getMonthDay(info.value.startDate)
        : "";
      const _week = info.value.week ? "(" + info.value.week + ")" : "";
      const _startTime = info.value.startTime ? info.value.startTime : "";
      const _endTime = info.value.endTime ? info.value.endTime : "";
      return _MonthDay + _week + " " + _startTime + "-" + _endTime;
    });
    const tabsActive: any = inject("tabsActive");
    const getHourMinute = (date: string) => {
      if (!date) return "";
      const hour = dayjs(date).hour();
      const minute = dayjs(date).minute();
      return hour + ":" + minute;
    };
    const getMonthDayWeek = (date: string) => {
      if (!date) return "";
      const month = dayjs(date).month();
      const day = dayjs(date).date();
      const week = dayjs(date).day();
      const weekZh = "(" + getWeekZh(week) + ")";
      return month + "月" + day + "日" + weekZh;
    };
    const getWeekZh = (week: number) => {
      let value = "";
      if (week == null) return value;
      switch (week) {
        case 0:
          value = "周天";
          break;
        case 1:
          value = "周一";
          break;
        case 2:
          value = "周二";
          break;
        case 3:
          value = "周三";
          break;
        case 4:
          value = "周四";
          break;
        case 5:
          value = "周五";
          break;
        case 6:
          value = "周六";
          break;
      }
      return value;
    };
    return {
      dateTime,
      info,
      tabsActive,
      getHourMinute,
      getMonthDayWeek,
    };
  },
});
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
      // font-family: PingFangSC, PingFangSC-Semibold;
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
        // font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #999999;
      }
      .text {
        margin-left: 89px;
        display: flex;
        flex-direction: column;
        font-size: 24px;
        // font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
        &.time-out {
          height: 24px;
          font-size: 24px;
          font-weight: 600;
          color: #ff0000;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
