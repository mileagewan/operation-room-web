<template>
  <div class="operat-room-card">
    <div class="container" :class="[data.hasFooter ? 'hasFooter' : '']">
      <div class="title-warp">
        <div class="title">
          <span class="time">10月20日(周五) 08:00-09:00</span>
          <span class="text">胸腔镜下肺大泡切除术</span>
        </div>
        <div class="state-bar">
          <div v-if="data.state == 1" class="bar end">已结束</div>
          <div v-else-if="data.state == 2" class="bar doing">进行中</div>
          <div v-else-if="data.state == 3" class="bar not-start">未开始</div>
        </div>
      </div>
      <oprat-info>
        <template #left-content>
          <div class="item">
            <span class="title">主刀医生</span>
            <span class="text">黄志浩</span>
          </div>
          <div class="item">
            <span class="title">麻醉医生</span>
            <span class="text">陈潜</span>
          </div>
          <div class="item">
            <span class="title">患者性别</span>
            <span class="text">男</span>
          </div>
        </template>
        <template #right-content>
          <div class="item">
            <span class="title">巡回护士</span>
            <span class="text">杨森</span>
          </div>
          <div class="item">
            <span class="title">器械护士</span>
            <span class="text">陈涛</span>
          </div>
          <div class="item">
            <span class="title">患者年龄</span>
            <span class="text">55岁</span>
          </div>
        </template>
      </oprat-info>
    </div>
    <div class="footer" v-if="data.hasFooter">
      <div class="title">时间更新</div>
      <div class="text">手术预计结束时间更新</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import OpratInfo from './OpratInfo.vue'
export default defineComponent({
  name: 'OpratRoomCard',
  components: {
    OpratInfo
  },
  setup() {
    const data = reactive({
      state: 3,
      hasFooter: false
    })
    return {
      data
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
        font-family: PingFangSC, PingFangSC-Semibold;
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
