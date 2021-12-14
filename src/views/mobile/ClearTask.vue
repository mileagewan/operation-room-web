<template>
  <div class="clear-task page-bg-line">
    <div class="header page-bg-line">
      <nav-bar @goBack="goBack" :title="title" />
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab :title="`当前任务(${todayNum})`" name="UNDO" />
        <van-tab :title="`已完成任务(${tomorrowNum})`" name="DONE" />
      </van-tabs>
    </div>
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <DoneSummary
          class="done-summary-m"
          :options="options"
          v-if="active === 'DONE'"
        />
        <van-list
          v-if="listData.length > 0"
          v-model:loading="loadingList"
          :finished="finishedList"
          finished-text="没有更多了"
        >
          <template v-if="active === 'UNDO'">
            <ClearCompletedCard
              v-for="(item, index) in listData"
              :key="index"
              :data="item"
              @btnclick="doneBtn"
            />
          </template>
          <template v-else-if="active === 'DONE'">
            <ClearTaskCard
              class="clear-task-cards"
              v-for="(item, index) in listData"
              :key="index"
              :data="item"
            />
          </template>
        </van-list>
        <EmptyPage
          :class="[active === 'DONE' ? 'empty-page-h' : '']"
          v-else-if="!loadingList && listData.length == 0"
        />
      </van-pull-refresh>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  onBeforeMount,
  provide,
  readonly,
} from "vue";
import ClearTaskCard from "./components/ClearTaskCard.vue";
import ClearCompletedCard from "./components/ClearCompletedCard.vue";
import Request from "@/service/request";
import { ReturnData } from "@/types/interface-model";
import JsToFlutter from "@/utils/js-to-flutter";
import { Toast } from "vant";

export default defineComponent({
  name: "ClearTask",
  components: {
    ClearTaskCard,
    ClearCompletedCard,
  },
  setup() {
    const state = reactive({
      title: "手术室",
      active: "UNDO",
      todayNum: 0,
      tomorrowNum: 0,
      refreshing: false,
      loadingList: false,
      finishedList: true,
      totalPage: 0,
      pageNo: 1,
      pageSize: 5,
      options: [
        {
          label: "清洁数量",
          value: 0,
        },
        {
          label: "准时率",
          value: "4/7",
        },
      ],
    });
    provide("tabsActive", readonly(state));
    const listData = ref<any[]>([]);
    const goBack = (): void => {
      JsToFlutter.goback();
    };
    onBeforeMount(() => {
      // 获取当前任务数量
      queryCleanTaskList(true, "UNDO");
      // 获取已完成任务数量
      queryCleanTaskList(true, "DONE");
      onRefresh();
    });
    const queryCleanTaskList = async (
      getNum = false,
      type: string,
      isTabClick?: boolean
    ) => {
      try {
        listData.value = []
        const params = {};
        let xhrName = "";
        if (type === "UNDO") {
          xhrName = "queryCurrentCleanTaskList";
        } else if (type === "DONE") {
          xhrName = "queryCompletedCleanTask";
        }
        if (isTabClick) {
          Toast.loading({
            duration: 0,
            message: "加载中...",
            forbidClick: true,
          });
        }
        await Request.xhr(xhrName, params)
          .then((r: ReturnData) => {
            if (r.code === 200) {
              const data = r.data;
              if (getNum) {
                if (type === "UNDO") {
                  state.todayNum = data?.length ?? 0;
                } else if (type === "DONE") {
                  state.tomorrowNum = data?.cleanTaskDTOList.length ?? 0;
                }
              } else if (!getNum) {
                if (type === "UNDO") {
                  listData.value = data;
                } else if (type === "DONE") {
                  state.options[0].value = data?.cleanNum ?? 0;
                  state.options[1].value = data?.onTimeNum ?? 0;
                  listData.value = data?.cleanTaskDTOList ?? [];
                }
                state.refreshing = false;
                state.loadingList = false;
              }
            }
          })
          .finally(() => {
            if (isTabClick) {
              Toast.clear();
            }
          });
      } catch (e) {}
    };
    // tab切换
    const onClickTab = ({ name }: any) => {
      state.active = name;
      listData.value = [];
      onRefresh(true);
    };
    // 下拉刷新
    const onRefresh = async (isTabClick?: boolean) => {
      if (!isTabClick) {
        state.refreshing = true;
      }
      state.loadingList = true;
      state.pageNo = 1;
      queryCleanTaskList(false, state.active, isTabClick);
    };
    // 触发完成btn
    const doneBtn = (id: any) => {
      console.log(id);
      updateData(id);
    };
    // 按钮触发接口
    const updateData = async (id: number) => {
      try {
        // const params = `id=${id}`;
        const params = {
          opTaskId: id,
        };
        Toast.loading({ message: "加载中...", forbidClick: true });
        await Request.xhr("getClearTaskUpdate", params)
          .then((r: ReturnData) => {
            if (r.code === 200) {
              Toast.clear();
              onRefresh();
            }
          })
          .finally(() => {
            Toast.clear();
          });
      } catch (e) {
        Toast.clear();
      }
    };
    return {
      onClickTab,
      listData,
      onRefresh,
      goBack,
      ...toRefs(state),
      doneBtn,
    };
  },
});
</script>
<style lang="scss" scoped>
.clear-task {
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
      height:calc(100% - 24px);
    }
  }
}
:deep(.van-list) {
  padding: 0 24px;
  .clear-completed-card {
    margin-bottom: 24px;
    &:nth-child(1){
      margin-top: 24px;
    }
  }
  .clear-task-cards {
    margin-bottom: 24px;
  }
  :deep(.empty-page) {
    transform: translateY(-168px);
  }
}
.done-summary-m {
  margin-top: 24px;
}
:deep(.empty-page-h) {
  height: calc(100% - 250px);
}
</style>
