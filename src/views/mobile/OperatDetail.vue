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
              <div>{{ dateTime }}</div>
              <div>{{ patientInfo.name }}</div>
            </div>
            <oprat-info>
              <template #left-content>
                <div class="item">
                  <span class="title">手术室</span>
                  <span
                    class="text"
                  >{{ patientInfo.departmentWardName }} - {{ patientInfo.oproomSubName }}</span>
                </div>
                <div class="item">
                  <span class="title">主刀医生</span>
                  <span class="text">{{ patientInfo.surgeonName }}</span>
                </div>
                <div class="item">
                  <span class="title">麻醉医生</span>
                  <span class="text">{{ patientInfo.anesthetistName }}</span>
                </div>
                <div class="item">
                  <span class="title">患者性别</span>
                  <span class="text">{{ patientInfo.patientSex }}</span>
                </div>
              </template>
              <template #right-content>
                <div class="item">
                  <span class="title">巡回护士</span>
                  <span class="text">{{ patientInfo.circulatingNurseName }}</span>
                </div>
                <div class="item">
                  <span class="title">器械护士</span>
                  <span class="text">{{ patientInfo.instrumentNurseName }}</span>
                </div>
                <div class="item">
                  <span class="title">患者年龄</span>
                  <span
                    class="text"
                  >{{ patientInfo.patientAge ? (patientInfo.patientAge + '岁') : '' }}</span>
                </div>
              </template>
            </oprat-info>
          </template>
          <template #content>
            <div class="title">手术进度</div>
            <surgical-progress :data="surgicalProgressData" />
          </template>
        </TaskView>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script lang="ts">
import SurgicalProgress from './components/SurgicalProgress.vue'
import OpratInfo from './components/OpratInfo.vue'
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, reactive, toRefs, ref, computed, onMounted } from 'vue'
import Request from '@/service/request';
import { ReturnData } from '@/types/interface-model';
import { getMonthDay } from '@/utils/date-formt'
import JsToFlutter from '@/utils/js-to-flutter';

export default defineComponent({
  name: 'OperatDetail',
  components: {
    SurgicalProgress,
    OpratInfo
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      title: '手术详情',
      loadingRefresh: false,
    })
    const patientInfo = ref<any>({})
    const surgicalProgressData = ref<any[]>([])
    onMounted(() => {
      if (route.query?.id) {
        loadData(route.query.id)
      }
    })
    // 接口请求
    const loadData = async (id: any) => {
      try {
        const params = `opCode=${'001'}`
        await Request.xhr('getOperatDetail', {}, params).then((r: ReturnData) => {
          if (r.code === 200) {
            const data = r.data;
            patientInfo.value = data
            surgicalProgressData.value = data.sectionVoList
          }
          console.log(r)
        })
      } catch (e) {

      }
    }
    const dateTime = computed(() => {
      const _MonthDay = patientInfo.value.startDate ? getMonthDay(patientInfo.value.startDate) : ''
      const _week = patientInfo.value.week ? ('(' + patientInfo.value.week + ')') : ''
      const _startTime = patientInfo.value.startTime ? patientInfo.value.startTime : ''
      const _endTime = patientInfo.value.endTime ? patientInfo.value.endTime : ''
      return _MonthDay + _week + _startTime + '-' + _endTime
    })

    const goBack = (): void => {
      if (route.query?.type === 'app') {
        JsToFlutter.goback();
      } else {
        router.back()
      }
    }
    // 下拉刷新
    const onRefresh = async () => {
      await loadData(route.query.id)
      state.loadingRefresh = false
    };
    return {
      onRefresh,
      goBack,
      ...toRefs(state),
      patientInfo,
      getMonthDay,
      dateTime,
      surgicalProgressData
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
