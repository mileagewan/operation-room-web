<template>
  <div class="surgical-progress">
    <div class="progress-warp" v-for="(item, index) in data" :key="index">
      <div class="arrow" v-if="index != 0">
        <div class="bar">
          <IconFont
            icon="icon-jindujiantou"
            :class="[item.pointStatus == 1 ? 'icons-current-select-green' : '']"
          />
        </div>
      </div>
      <div class="item">
        <div class="time-warp">
          <span class="date">{{ getMonthDay_(item.pointCompletedTime) }}</span>
          <span class="time">{{ getHourMinute(item.pointCompletedTime) }}</span>
        </div>
        <div
          class="icon-warp"
          :class="[
            item.pointStatus == 1 ? 'icons-current-select-green-bg' : '',
          ]"
        >
          <!-- <IconFont
            v-if="item.status == 3"
            icon="icon-yiwancheng icons-default-color"
            :class="[item.doing ? 'icons-end' : '']"
          />
          <IconFont
            v-if="item.status == 2"
            icon="icon-jinhangzhong icons-default-color"
            :class="[1 ? 'icons-current-select-white' : '']"
          />
          <IconFont
            v-if="item.status == null || item.status == 1 || item.status == 0"
            icon="icon-daikaishi icons-default-color"
            :class="[item.doing ? 'icons-not-start' : '']"
          /> -->
          <IconFont
            :icon="`${getIconType(item.pointName)} `"
            :class="[getIconColorStyle(item.pointStatus)]"
          />
        </div>
        <div class="text-warp">
          <span
            class="title"
            :class="[
              item.pointStatus == 1 ? 'icons-current-select-green' : '',
            ]"
            >{{ item.pointName }}</span
          >
          <span class="name">{{ item.pointExeUserName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { getMonthDay_, getHourMinute } from "@/utils/date-formt";

export default defineComponent({
  name: "SurgicalProgress",
  props: {
    data: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  setup() {
    const aa = "1";
    const itemList = ref([]);
    const currentSelect = ref(true);
    const getIconType = (type: string) => {
      let value = "";
      if (type == null) return value;
      switch (type) {
        case "手术排台":
          value = "";
          break;
        case "未开始手术":
          value = "";
          break;
        case "术前准备":
          value = "";
          break;
        case "送手术":
          value = "";
          break;
        case "转送中":
          value = "";
          break;
        case "到手术室":
          value = "icon-shoushushi1";
          break;
        case "到手术间":
          value = "icon-shoushujian";
          break;
        case "麻醉":
          value = "icon-mazui";
          break;
        case "手术中":
          value = "icon-shoushuzhong";
          break;
        case "苏醒":
          value = "icon-suxing";
          break;
        case "进复苏室":
          value = "icon-rufusushi";
          break;
        case "复苏室苏醒":
          value = "";
          break;
        case "出复苏室":
          value = "";
          break;
        case "出手术室":
          value = "";
          break;
        case "回病房":
          value = "";
          break;
        case "手术结束":
          value = "icon-shoushujieshu";
          break;
        case "手术取消":
          value = "";
          break;
        default:
          value = "";
          break;
      }
      return value;
    };
    const getIconColorStyle = (pointStatus: number): string => {
      let value = "icons-not-start";
      if (pointStatus == null) return value;
      switch (pointStatus) {
        // 节点状态 0未开始 1进行中 2已完成 3已取消
        case 0:
          value = "icons-not-start";
          break;
        case 1:
          value = "icons-doing";
          break;
        case 2:
          value = "icons-end";
          break;
      }
      return value;
    };
    return {
      aa,
      itemList,
      currentSelect,
      getMonthDay_,
      getHourMinute,
      getIconType,
      getIconColorStyle,
    };
  },
});
</script>
<style lang="scss" scoped>
.surgical-progress {
  position: relative;
  .progress-warp {
    .arrow {
      padding-left: 109px;
      height: 48px;
      position: relative;
      .bar {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(238, 247, 255);
        width: 15px;
        height: calc(100% + 16px);
        transform: translateY(-8px);
      }
      .icon-jindujiantou {
        display: inline-block;
        transform: rotate(90deg) scale(0.4);
        color: #b6ddff;
      }
    }
    .item {
      display: flex;
      align-items: center;
      height: 48px;
      .time-warp {
        display: flex;
        flex-direction: column;
        margin-right: 19px;
        width: 73px;
        align-items: center;
        .date {
          font-size: 24px;
          font-weight: 400;
          color: #333333;
        }
        .time {
          font-size: 20px;
          font-weight: 400;
          color: #333333;
        }
      }
      .icon-warp {
        background: rgba(238, 247, 255);
        opacity: 1;
        border-radius: 48px;
        width: 48px;
        height: 48px;
        position: relative;
        z-index: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 30px;
        }
      }
      .text-warp {
        margin-left: 30px;
        display: flex;
        .title {
          display: inline-block;
          min-width: 120px;
          font-size: 24px;
          font-weight: 600;
          color: #999999;
          padding: 0;
        }
        .name {
          margin-left: 24px;
          font-size: 24px;
          font-weight: 400;
          color: #999999;
          max-width: 300px;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  .icons-current-select-white {
    color: rgba(255, 255, 255, 1) !important;
  }
  .icons-current-select-green-bg {
    background-color: rgba(59, 220, 55, 1) !important;
  }
  .icons-current-select-green {
    color: rgba(59, 220, 55, 1) !important;
  }
  .icons-not-start {
    color: rgba(91, 199, 249, 1);
  }
  .icons-end {
    color: rgba(182, 221, 255, 1);
  }
  .icons-doing {
    color: #fff !important;
  }
  .icons-default-color {
    color: rgba(182, 221, 255, 1);
  }
}
</style>
