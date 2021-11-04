<template>
  <div class="operat-detail page-bg-line">
    <div class="header page-bg-line">
      <nav-bar @goBack="goBack" :title="title" />
    </div>
    <div class="content">
      <van-pull-refresh v-model="loadingRefresh" @refresh="onRefresh">
        <TaskView>
          <template #header>
            <div class="date-title">
              {{ dateTime }}
              <div>10月20日(周五) 08:00-09:00</div>
              <div>胸腔镜下肺大泡切除术</div>
            </div>
            <oprat-info>
              <template #left-content>
                <div class="item">
                  <span class="title">手术室</span>
                  <span class="text">二区域 - 手术室05</span>
                </div>
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
          </template>
          <template #content>
            <div class="title">手术进度</div>
            <surgical-progress />
          </template>
        </TaskView>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script lang="ts">
import SurgicalProgress from './components/SurgicalProgress.vue'
import OpratInfo from './components/OpratInfo.vue'
import { useRouter } from 'vue-router'
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';
import { MonthDay } from '@/utils/date-formt'

export default defineComponent({
  name: 'OperatDetail',
  components: {
    SurgicalProgress,
    OpratInfo
  },
  setup() {
    const loading = ref(false)
    const state = reactive({
      title: '手术详情',
      loadingRefresh: false,
      loadingList: false,
      finishedList: false
    })
    const dateTimeRef = ref('')
    const dateTime = computed((item) => {
      console.log('---item---', item)
    })
    const listData = ref<any[]>([])
    // 加载更多
    const onLoad = async () => {
      console.log('加载更多')
      await loadData()
      state.loadingList = false
      state.finishedList = true
    }
    // 接口请求
    const loadData = async () => {
      try {
        const params = `opCode=${'002'}`
        await Request.xhr('getOperatDetail', {}, params).then((r: ReturnData) => {
          if (r.code === 200) {
            const data = r.data;
            listData.value = data.records
          }
          console.log(r)
        })
      } catch (e) {

      }
    }
    const router = useRouter()
    const goBack = (): void => {
      router.back()
    }
    // 下拉刷新
    const onRefresh = async () => {
      await loadData()
      state.loadingRefresh = false
    };
    return {
      onLoad,
      onRefresh,
      goBack,
      ...toRefs(state),
      MonthDay,
      dateTime
    }
  },
})
</script>
<style lang="scss" scoped>
.operat-detail {
  .header {
    position: fixed;
    width: 100%;
    z-index: 99;
    top: 0;
  }
  .content {
    padding: 24px;
    margin-top: 85px;
    height: calc(100vh - 85px);
    background-color: #f9f9f9;
    padding-top: 12px;
    .van-pull-refresh {
      overflow: visible;
    }
  }
  .date-title {
    font-size: 36px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    color: #000000;
    margin-bottom: 24px;
  }
  :deep(.task-view) {
    .task-view-header {
      padding: 24px;
      .info-content.info-right {
        padding-top: 48px;
        margin-left: 11px;
      }
    }
    .task-view-contet {
      padding-top: 24px;
      padding-bottom: 24px;
      .title {
        font-size: 30px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: #000000;
        padding: 10px 0 24px 0;
      }
    }
  }
}
</style>
