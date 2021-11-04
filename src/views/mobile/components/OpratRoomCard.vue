<template>
  <div class="operat-room-card">
    <div class="container" :class="[hasFooter ? 'hasFooter' : '']">
      <div class="title-warp">
        <div class="title">
          <span class="time">{{ time }}</span>
          <span class="text">{{ name }}</span>
        </div>
        <div class="state-bar">
          <div v-if="state == 1" class="bar end">已结束</div>
          <div v-else-if="state == 2" class="bar doing">进行中</div>
          <div v-else-if="state == 3" class="bar not-start">未开始</div>
        </div>
      </div>
      <oprat-info>
        <template #left-content>
          <slot name="left-content" />
        </template>
        <template #right-content>
          <slot name="right-content" />
        </template>
      </oprat-info>
    </div>
    <div class="footer" v-if="hasFooter">
      <div class="title">时间更新</div>
      <div class="text">手术预计结束时间更新</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import OpratInfo from './OpratInfo.vue'
export default defineComponent({
  name: 'OpratRoomCard',
  components: {
    OpratInfo
  },
  props: {
    dateTime: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const data = reactive({
      time: props.dateTime,
      name: props.name,
      state: 3,
      hasFooter: false
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>
<style lang="scss" scoped>
.operat-room-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 12px 24px 0px rgba(217, 220, 221, 0.5);
  margin: 0 24px;
  overflow: hidden;
  .container {
    padding: 30px 24px 48px 24px;
    &.hasFooter {
      padding-bottom: 12px;
    }
    .title-warp {
      display: flex;
      justify-content: space-between;
      padding-bottom: 12px;
      .title {
        display: flex;
        flex-direction: column;

        font-size: 36px;
        //font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: #000000;
      }
      .state-bar {
        padding-top: 6px;
        .bar {
          width: 96px;
          height: 40px;

          font-size: 24px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          &.end {
            background: #fafafa;
            color: #dddddd;
          }
          &.doing {
            background: #e5ffe6;
            color: #3bdc37;
          }
          &.not-start {
            background: #defaff;
            color: #5bc7f9;
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    height: 60px;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 144px;
      height: inherit;
      background: rgba(255, 0, 0, 0.05);

      font-size: 24px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      color: #ff0000;
    }
    .text {
      flex: 1;
      display: flex;
      align-items: center;
      background: rgba(255, 0, 0, 0.03);
      height: inherit;
      padding-left: 16px;
      font-size: 24px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #ff0000;
    }
  }
}
</style>
