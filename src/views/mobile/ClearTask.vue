<template>
  <div class="clear-task page-bg-line">
    <div class="header page-bg-line">
      <nav-bar @goBack="goBack" :title="title" />
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab :title="`当前任务(${todayNum})`" name="UNDO" />
        <van-tab :title="`已完成任务`" name="DONE" />
      </van-tabs>
    </div>
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loadingList"
          :finished="finishedList"
          @load="onLoad"
          finished-text="没有更多了"
        >
          <template v-if="active === 'UNDO'">
            <ClearCompletedCard
              v-for="(item,index) in listData"
              :key="index"
              :data="item"
              @btnclick="doneBtn"
            />
          </template>
          <template v-else-if="active === 'DONE'">
            <ClearTaskCard
              class="clear-task-cards"
              v-for="(item,index) in listData"
              :key="index"
              :data="item"
            />
          </template>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import ClearTaskCard from './components/ClearTaskCard.vue'
import ClearCompletedCard from './components/ClearCompletedCard.vue'
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';

export default defineComponent({
  name: 'ClearTask',
  components: {
    ClearTaskCard,
    ClearCompletedCard
  },
  setup() {
    const state = reactive({
      title: '手术室',
      active: 'UNDO',
      todayNum: 0,
      refreshing: false,
      loadingList: false,
      finishedList: false,
      totalPage: 0,
      pageNo: 1,
      pageSize: 3,
    })
    const listData = ref<any[]>([])
    const router = useRouter()
    const goBack = (): void => {
      router.back()
    }
    onBeforeMount(() => {
      // 获取当前任务数量
      // loadData('UNDO', 1, 100, true)
    })
    // 加载更多
    const onLoad = async () => {
      if (!state.refreshing && state.pageNo < state.totalPage) {
        console.log('加载更多')
        state.pageNo = state.pageNo + 1
      }
      if (state.refreshing) {
        console.log('----refreshing---')
        listData.value = [];
        state.refreshing = false;
      }
      loadData(state.active, state.pageNo, state.pageSize)
    }
    // 接口请求
    const loadData = async (taskStatus: string, pageNo: number, pageSize: number, getNum?: boolean) => {
      try {
        const params = {
          taskStatus: taskStatus,
          pageNo: pageNo,
          pageSize: pageSize,
        }
        await Request.xhr('getClearTask', params).then((r: ReturnData) => {
          if (r.code === 200) {
            const data = r.data;
            // if (getNum) {
            //   if (taskStatus === 'UNDO') {
            //     state.todayNum = data.total
            //   }
            // } else {

            // }
            if (taskStatus === 'UNDO') {
              state.todayNum = data.total
            }
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
    // tab切换
    const onClickTab = ({ name }: any) => {
      state.active = name;
      onRefresh()
    }
    // 下拉刷新
    const onRefresh = async () => {
      state.refreshing = true
      state.finishedList = false
      state.loadingList = true
      state.pageNo = 1
      onLoad()
    };
    // 触发完成btn
    const doneBtn = (id: any) => {
      console.log(id)
      updateData(id)
    }
    // 按钮触发接口
    const updateData = async (id: number) => {
      try {
        const params = `id=${id}`
        await Request.xhr('getClearTaskUpdate', {}, params).then((r: ReturnData) => {
          if (r.code === 200) {
            onRefresh()
          }
        })
      } catch (e) {

      }
    }
    return {
      onClickTab,
      listData,
      onLoad,
      onRefresh,
      goBack,
      ...toRefs(state),
      doneBtn
    }
  },
})
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
    }
  }
}
:deep(.van-list) {
  padding: 0 24px;
  .clear-completed-card {
    margin-bottom: 24px;
  }
  .clear-task-cards {
    margin-bottom: 24px;
  }
}
</style>
