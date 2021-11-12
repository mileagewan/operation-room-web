<template>
  <div class="surgical-progress">
    <div class="progress-warp" v-for="(item,index) in data" :key="index">
      <div class="arrow" v-if="index != 0">
        <div class="bar">
          <IconFont
            icon="icon-jindujiantou"
            :class="[item.status == 2 ? 'icons-current-select-green' : '']"
          />
        </div>
      </div>
      <div class="item">
        <div class="time-warp">
          <span class="date">{{ getMonthDays(item.startDate) }}</span>
          <span class="time">{{ getMinuteSeconds(item.startDate) }}</span>
        </div>
        <div class="icon-warp" :class="[item.status == 2 ? 'icons-current-select-green-bg' : '']">
          <IconFont
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
            v-if="(item.status == null || item.status == 1 || item.status == 0)"
            icon="icon-daikaishi icons-default-color"
            :class="[item.doing ? 'icons-not-start' : '']"
          />
        </div>
        <div class="text-warp">
          <span class="title">{{ item.sectionName }}</span>
          <span class="name">{{ item.receiveUserName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

export default defineComponent({
  name: 'SurgicalProgress',
  props: {
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup() {
    const aa = '1'
    const itemList = ref([])
    const currentSelect = ref(true)
    const getMonthDays = (item: string) => {
      if (!item) return ''
      const _s = item.substring(5, 10)
      return _s
    }
    const getMinuteSeconds = (item: string) => {
      if (!item) return ''
      const _s = item.substring(11, 16)
      return _s
    }
    return {
      aa,
      itemList,
      currentSelect,
      getMonthDays,
      getMinuteSeconds
    }
  },
})
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
          // font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
        }
        .time {
          font-size: 20px;
          // font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
        }
      }
      .icon-warp {
        background: rgba(238, 247, 255);
        opacity: 1;
        border-radius: 48px;
        position: relative;
        z-index: 4;
        i {
          font-size: 48px;
        }
      }
      .text-warp {
        margin-left: 30px;
        display: flex;
        .title {
          display: inline-block;
          min-width: 120px;
          font-size: 24px;
          // font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #999999;
          padding: 0;
        }
        .name {
          margin-left: 24px;
          font-size: 24px;
          // font-family: PingFangSC, PingFangSC-Regular;
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
    color: rgba(91, 199, 249);
  }
  .icons-end {
    color: rgba(182, 221, 255, 1);
  }
  .icons-default-color {
    color: rgba(182, 221, 255, 1);
  }
}
</style>
