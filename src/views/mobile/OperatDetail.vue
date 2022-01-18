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
              <div>
                {{
                  `${getMonthDayWeek(opInfoDTO.startTime)} ${getOperatTime(
                    opInfoDTO.startTime,
                    opInfoDTO.endTime
                  )}`
                }}
              </div>
              <div>{{ opInfoDTO.name }}</div>
            </div>
            <oprat-info>
              <div class="row">
                <div class="item">
                  <span class="title">手术室</span>
                  <span class="text">
                    <!-- {{ opInfoDTO.departmentWardName }} - {{ opInfoDTO.oproomSubName }} -->
                    {{ opInfoDTO.descName }}
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">主刀医生</span>
                  <span class="text">{{ opInfoExtDTO.surgeonName }}</span>
                </div>
                <div class="item">
                  <span class="title">巡回护士</span>
                  <span class="text">{{
                    opInfoExtDTO.circulatingNurseName
                  }}</span>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">麻醉医生</span>
                  <span class="text">{{ opInfoExtDTO.anesthetistName }}</span>
                </div>
                <div class="item">
                  <span class="title">器械护士</span>
                  <span class="text">{{
                    opInfoExtDTO.instrumentNurseName
                  }}</span>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">患者性别</span>
                  <span class="text">
                    {{
                      opPatientDTO.sex == 1
                        ? "男"
                        : opPatientDTO.sex == 2
                        ? "女"
                        : ""
                    }}
                  </span>
                </div>
                <div class="item">
                  <span class="title">患者年龄</span>
                  <span class="text">{{
                    opPatientDTO.age ? opPatientDTO.age + "岁" : ""
                  }}</span>
                </div>
              </div>
            </oprat-info>
          </template>
          <template #content>
            <div class="title">手术进度</div>
            <surgical-progress :data="opFlowPointDetailsDTOList" />
          </template>
        </TaskView>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script lang="ts">
import SurgicalProgress from "./components/SurgicalProgress.vue";
import OpratInfo from "./components/OpratInfo.vue";
import { useRouter, useRoute } from "vue-router";
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  // computed,
  onMounted,
} from "vue";

import Request from "@/service/request";
import { ReturnData } from "@/types/interface-model";
import {
  getMonthDay,
  getMonthDayWeek,
  getOperatTime,
} from "@/utils/date-formt";
import JsToFlutter from "@/utils/js-to-flutter";
import useMessageRead from "@/views/mobile/hooks/useMessageRead";

export default defineComponent({
  name: "OperatDetail",
  components: {
    SurgicalProgress,
    OpratInfo,
  },
  setup() {
    useMessageRead();
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      title: "手术详情",
      loadingRefresh: false,
    });
    const opInfoDTO = ref<any>({}); // 手术信息
    const opPatientDTO = ref<any>({}); // 手术患者信息
    const opFlowPointDetailsDTOList = ref<any[]>([]); // 手术流程节点详情列表
    const opInfoExtDTO = ref<any>({}); // 手术扩展信息
    onMounted(() => {
      if (route.query?.opInfoId) {
        loadData(route.query.opInfoId);
      }
    });
    // 接口请求
    const loadData = async (id: any) => {
      try {
        // const params = {
        //   opCode: id
        // }
        const paramString = `opInfoId=${id}`;
        const params = {
          opInfoId: id,
        };
        await Request.xhr("getOperatDetail", params, paramString).then(
          (r: ReturnData) => {
            if (r.code === 200) {
              const data = r.data;
              opInfoDTO.value = data.opInfoDTO;
              opInfoExtDTO.value = data.opInfoExtDTO;
              opPatientDTO.value = data.opPatientDTO;
              opFlowPointDetailsDTOList.value = data.opFlowPointDetailsDTOList;
            }
            console.log(r);
          }
        );
      } catch (e) {}
    };
    // const dateTime = computed(() => {
    //   const _MonthDay = patientInfo.value.startDate ? getMonthDay(patientInfo.value.startDate) : ''
    //   const _week = patientInfo.value.week ? ('(' + patientInfo.value.week + ')') : ''
    //   const _startTime = patientInfo.value.startTime ? patientInfo.value.startTime : ''
    //   const _endTime = patientInfo.value.endTime ? patientInfo.value.endTime : ''
    //   return _MonthDay + _week + _startTime + '-' + _endTime
    // })

    const goBack = (): void => {
      if (route.query?.type === "app") {
        JsToFlutter.goback();
      } else {
        const _dateType: any = route?.query?.dateType;
        router.push({
          path: "operationRoom",
          query: {
            dateType: _dateType || "",
          },
        });
        // router.back()
      }
    };
    // 下拉刷新
    const onRefresh = async () => {
      await loadData(route.query.opInfoId);
      state.loadingRefresh = false;
    };
    return {
      onRefresh,
      goBack,
      ...toRefs(state),
      opPatientDTO,
      getMonthDay,
      opInfoDTO,
      // dateTime,
      opFlowPointDetailsDTOList,
      opInfoExtDTO,
      getMonthDayWeek,
      getOperatTime,
    };
  },
});
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
    overflow-y: scroll;
    .van-pull-refresh {
      overflow: visible;
    }
  }
  .date-title {
    font-size: 36px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 18px;
    line-height: 48px;
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
        // font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: #000000;
        padding: 10px 0 24px 0;
      }
    }
  }
}
</style>
