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
      <van-pull-refresh v-model="loadingRefresh" @refresh="onRefresh">
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
            <ClearTaskCard v-for="(item,index) in listData" :key="index" :data="item" />
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
      loadingRefresh: false,
      loadingList: false,
      finishedList: false
    })
    const listData = ref<any[]>([])
    const router = useRouter()
    const goBack = (): void => {
      router.back()
    }
    onBeforeMount(() => {
      // 获取当前任务数量
      loadData('UNDO', true)
    })
    // 加载更多
    const onLoad = async () => {
      console.log('加载更多')
      await loadData(state.active)
      state.loadingList = false
      state.finishedList = true
    }
    // 接口请求
    const loadData = async (taskStatus: string, getNum?: boolean) => {
      try {
        const params = {
          taskStatus: taskStatus,
          pageNo: 1,
          pageSize: 100,
        }
        await Request.xhr('getClearTask', params).then((r: ReturnData) => {
          if (r.code === 200) {
            const data = r.data;
            if (getNum) {
              if (taskStatus === 'UNDO') {
                state.todayNum = data.total
              }
            } else {
              listData.value = data.records
            }
          }
          console.log(r)
        })
      } catch (e) {

      }
    }
    // tab切换
    const onClickTab = ({ name }: any) => {
      console.log(name)
      state.active = name;
      loadData(name)
    }
    // 下拉刷新
    const onRefresh = async () => {
      await loadData(state.active)
      state.loadingRefresh = false
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
            loadData(state.active)
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
}
</style>
