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
            :name="item?.opInfoDTO?.name"
            :tagCode="item?.opInfoDTO?.opSectionCode"
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
                    item?.opPatientDTO?.age
                      ? item?.opPatientDTO?.age + "岁"
                      : ""
                  }}</span>
                </div>
              </div>
            </template>
          </oprat-room-card>
        </van-list>
      </van-pull-refresh>
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
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";

export default defineComponent({
  name: "OperatingRoom",
  components: {
    OpratRoomCard,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      title: "手术间",
      refreshing: false,
      loadingList: false,
      finishedList: true,
      totalPage: 0,
      pageNo: 1,
      pageSize: 5,
      subRoomId: 0,
    });
    const listData = ref<any[]>([]);
    onBeforeMount(() => {
      if (route.query?.opInfoId) {
        state.subRoomId = route.query.opInfoId as any;
      }
      queryData();
    });
    // 加载更多
    // const onLoad = async () => {
    //   if (!state.refreshing && state.pageNo < state.totalPage) {
    //     console.log("加载更多");
    //     state.pageNo = state.pageNo + 1;
    //   }
    //   if (state.refreshing) {
    //     console.log("----refreshing---");
    //     listData.value = [];
    //     state.refreshing = false;
    //   }
    //   console.log("加载更12多");
    //   loadData();
    // };
    const queryData = async (refreshing = true) => {
      try {
        if (refreshing) {
          Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
          });
        }
        const params = `opRoomId=${state.subRoomId}`;
        await Request.xhr("getOperatingRoom", {}, params)
          .then((r: ReturnData) => {
            if (r.code === 200) {
              const data = r.data;
              listData.value = data;
              // if (listData?.value[0]) {
              //   state.title = listData?.value[0]?.oproomSubName ?? "手术间1";
              // }
              // state.totalPage = Math.ceil(data.total / state.pageSize);
              state.loadingList = false;
              state.refreshing = false;
              // if (state.pageNo >= state.totalPage) state.finishedList = true;
              console.log(r, data);
            }
          })
          .finally(() => {
            if (refreshing) {
              Toast.clear();
            }
          });
      } catch (e) {}
    };
    // 接口请求
    // const loadData = async () => {
    //   try {
    //     const params = {
    //       subRoomId: state.subRoomId,
    //       pageNo: state.pageNo,
    //       pageSize: state.pageSize,
    //     };
    //     await Request.xhr("getOperatingRoom", params).then((r: ReturnData) => {
    //       if (r.code === 200) {
    //         const data = r.data;
    //         listData.value = listData.value.concat(data.records);
    //         if (listData?.value[0]) {
    //           state.title = listData?.value[0]?.oproomSubName ?? "手术间1";
    //         }
    //         state.totalPage = Math.ceil(data.total / state.pageSize);
    //         state.loadingList = false;
    //         if (state.pageNo >= state.totalPage) state.finishedList = true;
    //       }
    //       console.log(r);
    //     });
    //   } catch (e) {}
    // };
    const goBack = (): void => {
      const _dateType: any = route?.query?.dateType;
      // router.back()
      router.push({
        path: "operationRoom",
        query: {
          dateType: _dateType || "",
        },
      });
    };
    // 下拉刷新
    const onRefresh = async () => {
      state.refreshing = true;
      // state.finishedList = false;
      state.loadingList = true;
      state.pageNo = 1;
      queryData(false);
      // onLoad();
    };
    return {
      onRefresh,
      goBack,
      // onLoad,
      ...toRefs(state),
      listData,
      getMonthDay,
      getMonthDayWeek,
      getOperatTime,
    };
  },
});
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
    overflow-y: scroll;
    :deep(.operat-room-card) {
      margin-bottom: 12px;
      margin-top: 12px;
    }
    .van-pull-refresh {
      height: calc(100vh - 90px);
      overflow: visible;
    }
  }
  :deep(.operat-room-card) {
    .oprat-info-warp {
      .info-content {
        &.info-left {
          .item .text {
            display: inline-block;
            width: 204px;
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
