<template>
  <div class="surgical-progress">
    <div class="item-warp" v-for="(item,index) in itemList" :key="index">
      <div class="arrow" v-if="index !=0">
        <van-icon name="down" :class="[currentSelect?'icon-current-select':'']" />
      </div>
      <div class="item">
        <div class="time-warp">
          <span class="date">09-20</span>
          <span class="time">15:35</span>
        </div>
        <div class="icon-warp">
          <van-icon name="checked" :class="[currentSelect?'icon-current-select':'']" />
        </div>
        <div class="text-warp">
          <span class="title">手术排台</span>
          <span class="name">护士长</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SurgicalProgress',
  setup() {
    const aa = '1'
    const itemList = ref(['1', '2', '2', '2', '2'])
    const currentSelect = ref(true)
    return {
      aa,
      itemList,
      currentSelect
    }
  },
})
</script>
<style lang="scss" scoped>
.surgical-progress {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 15px;
    background: rgba(25, 143, 247, 0.08);
    top: 40px;
    height: calc(100% - 80px);
    left: 102px;
  }
  .item-warp {
    .arrow{
      padding-left: 98px;
    }
    .item {
      display: flex;
      align-items: center;
      .time-warp {
        display: flex;
        flex-direction: column;
        margin-right: 19px;
        .date {
          font-size: 24px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
        }
        .time {
          font-size: 20px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
        }
      }
      .icon-warp {
        //background: rgba(25, 143, 247,);
        border-radius: 48px;
        i {
          font-size: 48px;
        }
      }
      .text-warp {
        margin-left: 30px;
        .title {
          font-size: 24px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #999999;
        }
        .name {
          margin-left: 24px;
          font-size: 24px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
  .icon-current-select{
    color: green;
  }
}
</style>
