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
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        v-if="listData.length > 0"
      >
        <van-list
          v-model:loading="loadingList"
          :finished="finishedList"
          finished-text="没有更多了"
        >
          <oprat-room-card
            v-for="(item, index) in listData"
            :key="index"
            :dateTime="`${getMonthDayWeek(
              item.opInfoDTO.startTime
            )} ${getOperatTime(
              item.opInfoDTO.startTime,
              item.opInfoDTO.endTime
            )}`"
            :name="item.opInfoDTO.name"
            :tagCode="item.opInfoDTO.opSectionCode"
            @click.stop="cardTitleClick(item)"
            @click-title="cardTitleClick(item)"
          >
            <template #content>
              <div class="row">
                <div class="item">
                  <span class="title">手术室</span>
                  <span class="text">{{ item?.opInfoDTO?.descName }}</span>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">主刀医生</span>
                  <span class="text">{{
                    item?.opInfoExtDTO?.surgeonName
                  }}</span>
                </div>
                <div class="item">
                  <span class="title">巡回护士</span>
                  <span class="text">{{
                    item?.opInfoExtDTO?.circulatingNurseName
                  }}</span>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">麻醉医生</span>
                  <span class="text">{{
                    item?.opInfoExtDTO?.anesthetistName
                  }}</span>
                </div>
                <div class="item">
                  <span class="title">器械护士</span>
                  <span class="text">{{
                    item?.opInfoExtDTO?.instrumentNurseName
                  }}</span>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">患者性别</span>
                  <span class="text">{{
                    item?.opPatientDTO?.sex == 1
                      ? "男"
                      : item?.opPatientDTO?.sex == 2
                      ? "女"
                      : ""
                  }}</span>
                </div>
                <div class="item">
                  <span class="title">患者年龄</span>
                  <span class="text">{{
                    item.opPatientDTO?.age ? item.opPatientDTO?.age + "岁" : ""
                  }}</span>
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
import { defineComponent, reactive, toRefs, ref, onBeforeMount } from "vue";
import OpratRoomCard from "./components/OpratRoomCard.vue";
import Request from "@/service/request";
import { ReturnData } from "@/types/interface-model";
import {
  getMonthDay,
  getMonthDayWeek,
  getOperatTime,
} from "@/utils/date-formt";
import { useRouter, useRoute } from "vue-router";
import JsToFlutter from "@/utils/js-to-flutter";
import { Toast } from "vant";

export default defineComponent({
  name: "OperationRoom",
  components: {
    OpratRoomCard,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      title: "手术室",
      active: "TODAY",
      todayNum: 0,
      tomorrowNum: 0,
      refreshing: false,
      loadingList: false,
      finishedList: false,
      totalPage: 0,
      pageNo: 1,
      pageSize: 5,
    });
    const listData = ref<any[]>([]);
    // 返回
    const goBack = (): void => {
      JsToFlutter.goback();
    };
    onBeforeMount(() => {
      if (route.query?.dateType) {
        const _dateType: any = route.query.dateType;
        state.active = _dateType;
      }
      // 获取今日数量
      queryOpList(true, "TODAY");
      // 获取明日数量
      queryOpList(true, "TOMORROW");
      onRefresh();
    });
    // tab切换
    const onClickTab = ({ name }: any) => {
      state.active = name;
      onRefresh(true);
    };
    // 接口请求
    const queryOpList = async (
      getNum = false,
      type: string,
      isTabClick?: boolean
    ) => {
      try {
        if (isTabClick) {
          Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
          });
        }
        let xhrName = "";
        const params = {};
        if (type === "TODAY") {
          xhrName = "queryTodayOpList";
        } else if (type === "TOMORROW") {
          xhrName = "queryTomorrowOpList";
        }
        await Request.xhr(xhrName, params)
          .then((r: ReturnData) => {
            if (r.code === 200) {
              const data = r.data;
              if (getNum) {
                if (type === "TODAY") {
                  state.todayNum = data.length;
                } else if (type === "TOMORROW") {
                  state.tomorrowNum = data.length;
                }
              } else if (!getNum) {
                listData.value = data;
                state.finishedList = true;
                state.refreshing = false;
              }
            }
          })
          .finally(() => {
            if (isTabClick) {
              Toast.clear();
            }
          });
      } catch (e) {
        console.log(e);
      }
    };
    // 下拉刷新
    const onRefresh = async (isTabClick?: boolean) => {
      state.refreshing = true;
      state.finishedList = false;
      state.loadingList = true;
      state.pageNo = 1;
      // onLoad(isTabClick);
      queryOpList(false, state.active, isTabClick);
      console.log(state.active);
    };
    // 点击跳转
    const cardTitleClick = (item: any) => {
      let path = "/operatDetail";
      let id = item?.code ?? "";
      const _opSectionCode: number = item?.opSectionCode;
      if (_opSectionCode < 3) {
        path = "/operatingRoom";
        id = item.oproomSubId;
      }
      router.push({
        path: path,
        query: {
          id: id,
          dateType: state.active ? state.active : "",
        },
      });
    };
    return {
      // onLoad,
      onRefresh,
      goBack,
      listData,
      ...toRefs(state),
      onClickTab,
      getMonthDay,
      cardTitleClick,
      getMonthDayWeek,
      getOperatTime,
    };
  },
});
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
  :deep(.empty-page) {
    transform: translateY(-168px);
  }
}
</style>
