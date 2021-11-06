<template>
  <div class="operating-room page-bg-line">
    <div class="header page-bg-line">
      <nav-bar @goBack="goBack" :title="title" />
    </div>
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loadingList"
          :finished="finishedList"
          @load="onLoad"
          finished-text="没有更多了"
        >
          <oprat-room-card
            v-for="(item,index) in listData"
            :key="index"
            :dateTime="`${item.startDate?getMonthDay(item.startDate):''}
            ${item.week?'(' + item.week + ')':''} ${item.startTime + '-' + item.endTime}`"
            :name="item.name"
          >
            <template #left-content>
              <div class="item">
                <span class="title">手术室</span>
                <span class="text">{{ item.departmentWardName }} - {{ item.oproomSubName }}</span>
              </div>
              <div class="item">
                <span class="title">主刀医生</span>
                <span class="text">{{ item.surgeonName }}</span>
              </div>
              <div class="item">
                <span class="title">麻醉医生</span>
                <span class="text">{{ item.anesthetistName }}</span>
              </div>
              <div class="item">
                <span class="title">患者性别</span>
                <span class="text">{{ item.patientSex }}</span>
              </div>
            </template>
            <template #right-content>
              <div class="item">
                <span class="title">巡回护士</span>
                <span class="text">{{ item.circulatingNurseName }}</span>
              </div>
              <div class="item">
                <span class="title">器械护士</span>
                <span class="text">{{ item.instrumentNurseName }}</span>
              </div>
              <div class="item">
                <span class="title">患者年龄</span>
                <span class="text">{{ item.patientAge?(item.patientAge + '岁'):'' }}</span>
              </div>
            </template>
          </oprat-room-card>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
import OpratRoomCard from './components/OpratRoomCard.vue'
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';
import { getMonthDay } from '@/utils/date-formt'

export default defineComponent({
  name: 'OperatingRoom',
  components: {
    OpratRoomCard,
  },
  setup() {
    const state = reactive({
      title: '手术间01间',
      refreshing: false,
      loadingList: false,
      finishedList: false,
      totalPage: 0,
      pageNo: 1,
      pageSize: 3,
    })
    const listData = ref<any[]>([])
    // 加载更多
    const onLoad = async () => {
      // console.log('加载更多')
      // await loadData()
      // state.loadingList = false
      // state.finishedList = true
      if (!state.refreshing && state.pageNo < state.totalPage) {
        console.log('加载更多')
        state.pageNo = state.pageNo + 1
      }
      if (state.refreshing) {
        console.log('----refreshing---')
        listData.value = [];
        state.refreshing = false;
      }
      console.log('加载更12多')
      loadData()
    }
    // 接口请求
    const loadData = async () => {
      try {
        const params = {
          subRoomId: 1,
          pageNo: state.pageNo,
          pageSize: state.pageSize,
        }
        await Request.xhr('getOperatingRoom', params).then((r: ReturnData) => {
          if (r.code === 200) {
            const data = r.data;
            listData.value = listData.value.concat(data.records)
            state.totalPage = Math.ceil(data.total / state.pageSize)
            state.loadingList = false;
            if (state.pageNo >= state.totalPage) state.finishedList = true
          }
          console.log(r)
        })
      } catch (e) {

      }
    }
    const goBack = (): void => {
      // router.back()
    }
    // 下拉刷新
    const onRefresh = async () => {
      // await loadData()
      // state.loadingRefresh = false
      state.refreshing = true
      state.finishedList = false
      state.loadingList = true
      state.pageNo = 1
      onLoad()
    };
    return {
      onRefresh,
      goBack,
      onLoad,
      ...toRefs(state),
      listData,
      getMonthDay
    }
  },
})
</script>
<style lang="scss" scoped>
.operating-room {
  .header {
    position: fixed;
    width: 100%;
    z-index: 99;
    top: 0;
  }
  .content {
    margin-top: 75px;
    height: calc(100vh - 75px);
    background-color: #f9f9f9;
    padding-top: 12px;
    :deep(.operat-room-card) {
      margin-bottom: 12px;
      margin-top: 12px;
    }
    .van-pull-refresh {
      overflow: visible;
    }
  }
  :deep(.operat-room-card) {
    .oprat-info-warp {
      .info-content {
        &.info-left{
          .item .text{
            display: inline-block;
            width:204px;
          }
        }
        &.info-right {
          margin-left: 12px;
          padding-top: 54px;
        }
      }
    }
  }
}
</style>
