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
          <span
            >{{ getMonthDayWeek(info.publishTime) }}
            {{ getOperatTime(info.startTime, info.endTime) }}</span
          >
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
        <div class="text time-out">
          {{ info.overTime > 0 ? `超时${getMinuteCeil(info.overTime)}` : "" }}
        </div>
      </div>
      <div class="item" v-if="tabsActive.active == 'DONE'">
        <div class="title">完成时间</div>
        <div class="text complete-time-warp">
          <span class="completeTime">{{
            getHourMinute(info.completeTime)
          }}</span>
          <!-- <span class="overTime">{{
            info.overTime > 0 ? `${getMinute(info.overTime)}` : ""
          }}</span> -->
          <span class="overTime">{{
            info.overTime > 0 ? `超时${$filters.formatTime(info.overTime)}` : ""
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, inject } from "vue";
import {
  getMonthDay,
  getHourMinute,
  getMonthDayWeek,
  getOperatTime,
} from "@/utils/date-formt";

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
    const getMinuteCeil = (second: number): number | string => {
      if (second == null) return 0;

      const divisible: string = (second / 60).toString();
      const _parseInt: number = parseInt(divisible);
      const remainder: number = _parseInt % 60 >= 20 ? 1 : 0;
      const minutes = _parseInt + remainder;
      // console.log("---minutes---", minutes);
      let time = minutes + "";
      if (minutes > 60) {
        const min = minutes % 60;
        const hour = parseInt((minutes / 60).toString())
        time = hour + "小时" + min + "分";
      }
      return time;
    };
    const getMinute = (second: number): string => {
      if (second == null) return "";
      const divisible: string = (second / 60).toString();
      const minute: number = parseInt(divisible);
      const seconds: number = second % 60;
      
      return "超时" + minute + "分" + seconds + "秒";
    };
    return {
      dateTime,
      info,
      tabsActive,
      getHourMinute,
      getMonthDayWeek,
      getOperatTime,
      getMinuteCeil,
      getMinute,
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
      &:not(:nth-child(1)) {
        align-items: center;
      }
      .title {
        width: 120px;
        font-size: 24px;
        font-weight: 400;
        color: #999999;
      }
      .text {
        margin-left: 89px;
        display: flex;
        flex-direction: column;
        font-size: 24px;
        font-weight: 400;
        color: #333333;
        &.complete-time-warp {
          flex-direction: row;
          align-items: center;
        }
        .completeTime {
          min-width: 64px;
          margin-right: 12px;
        }
        &.time-out,
        .overTime {
          height: 24px;
          font-size: 24px;
          font-weight: 600;
          color: #ff0000;
          line-height: 1;
        }
      }
    }
  }
}
</style>
