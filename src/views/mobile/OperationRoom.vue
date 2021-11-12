<template>
  <div class="operation-room page-bg-line">
    <div class="header page-bg-line">
      <nav-bar @goBack="goBack" :title="title" />
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab :title="`今日手术(${todayNum})`" name="TODAY" />
        <van-tab :title="`明日手术(${tomorrowNum})`" name="TOMORROW" />
      </van-tabs>
    </div>
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" v-if="listData.length > 0">
        <van-list
          v-model:loading="loadingList"
          :finished="finishedList"
          @load="onLoad"
          finished-text="没有更多了"
        >
          <oprat-room-card
            v-for="(item,index) in listData"
            :key="index"
            :dateTime="`${getMonthDay(item.startDate)}${'(' + item.week + ')'} ${item.startTime + '-' + item.endTime}`"
            :name="item.name"
            :tagCode="item.opSectionCode"
            @click-title="cardTitleClick(item)"
          >
            <template #content>
              <div class="row">
                <div class="item">
                  <span class="title">手术室</span>
                  <span class="text">{{ item.departmentWardName }} - {{ item.oproomSubName }}</span>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">主刀医生</span>
                  <span class="text">{{ item.surgeonName }}</span>
                </div>
                <div class="item">
                  <span class="title">巡回护士</span>
                  <span class="text">{{ item.circulatingNurseName }}</span>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">麻醉医生</span>
                  <span class="text">{{ item.anesthetistName }}</span>
                </div>
                <div class="item">
                  <span class="title">器械护士</span>
                  <span class="text">{{ item.instrumentNurseName }}</span>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">患者性别</span>
                  <span
                    class="text"
                  >{{ item.patientSex == 1 ? '男' : (item.patientSex == 2 ? '女' : '') }}</span>
                </div>
                <div class="item">
                  <span class="title">患者年龄</span>
                  <span class="text">{{ item.patientAge ? (item.patientAge + '岁') : '' }}</span>
                </div>
              </div>
            </template>
          </oprat-room-card>
        </van-list>
      </van-pull-refresh>
      <EmptyPage v-else-if="!loadingList && listData.length == 0" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onBeforeMount } from 'vue'
import OpratRoomCard from './components/OpratRoomCard.vue'
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';
import { getMonthDay } from '@/utils/date-formt'
import { useRouter, useRoute } from 'vue-router'
import JsToFlutter from '@/utils/js-to-flutter';
import { Toast } from 'vant';

export default defineComponent({
  name: 'OperationRoom',
  components: {
    OpratRoomCard,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      title: '手术室',
      active: 'TODAY',
      todayNum: 0,
      tomorrowNum: 0,
      refreshing: false,
      loadingList: false,
      finishedList: false,
      totalPage: 0,
      pageNo: 1,
      pageSize: 5,
    })
    const listData = ref<any[]>([])
    // 返回
    const goBack = (): void => {
      JsToFlutter.goback();
    }
    onBeforeMount(() => {
      if (route.query?.dateType) {
        const _dateType: any = route.query.dateType
        state.active = _dateType
      }
      // 获取今日数量
      loadData('TODAY', 1, 1, true)
      // 获取明日数量
      loadData('TOMORROW', 1, 1, true)
      onRefresh()
    })
    // 加载更多
    const onLoad = async (isTabClick?: Boolean) => {
      if (!state.refreshing && state.pageNo < state.totalPage) {
        console.log('加载更多')
        state.pageNo = state.pageNo + 1
      }
      if (state.refreshing) {
        console.log('----refreshing---')
        listData.value = [];
        state.refreshing = false;
      }
      loadData(state.active, state.pageNo, state.pageSize, false, isTabClick)
    }
    // tab切换
    const onClickTab = ({ name }: any) => {
      state.active = name;
      onRefresh(true)
    }
    // 接口请求
    const loadData = async (dateType: string, pageNo: number, pageSize: number, getNum?: boolean, isTabClick?: Boolean) => {
      try {
        const params = {
          dateType: dateType,
          pageNo: pageNo,
          pageSize: pageSize,
        }
        if (isTabClick) {
          Toast.loading({
            duration: 0,
            message: '加载中...',
            forbidClick: true,
          });
        }
        await Request.xhr('getOperationRoom', params).then((r: ReturnData) => {
          if (r.code === 200) {
            const data = r.data;
            if (getNum) {
              if (dateType === 'TODAY') {
                state.todayNum = data.total
              } else if (dateType === 'TOMORROW') {
                state.tomorrowNum = data.total
              }
            } else {
              listData.value = listData.value.concat(data.records)
              state.totalPage = Math.ceil(data.total / state.pageSize)
              state.loadingList = false;
              if (state.pageNo >= state.totalPage) state.finishedList = true
            }
          }
          console.log(r)
        })
        if (isTabClick) {
          Toast.clear()
        }

      } catch (e) {

      }
    }
    // 下拉刷新
    const onRefresh = async (isTabClick?: Boolean) => {
      state.refreshing = true
      state.finishedList = false
      state.loadingList = true
      state.pageNo = 1
      onLoad(isTabClick)
    };
    // 点击跳转
    const cardTitleClick = (item: any) => {
      let path = '/operatDetail'
      let id = item?.code ?? ''
      const _opSectionCode: number = item?.opSectionCode
      if (_opSectionCode < 3) {
        path = '/operatingRoom'
        id = item.oproomSubId
      }
      router.push({
        path: path,
        query: {
          id: id,
          dateType: state.active ? state.active : ''
        }
      })
    }
    return {
      onLoad,
      onRefresh,
      goBack,
      listData,
      ...toRefs(state),
      onClickTab,
      getMonthDay,
      cardTitleClick
    }
  },
})
</script>
<style lang="scss" scoped>
.operation-room {
  .header {
    position: fixed;
    width: 100%;
    z-index: 99;
    top: 0;
  }
  .content {
    margin-top: 168px;
    height: calc(100vh - 168px);
    background-color: #f9f9f9;
    padding-top: 12px;
    overflow-y: scroll;
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
        &.info-right {
          margin-left: 12px;
          padding-top: 54px;
        }
      }
    }
  }
}
</style>
