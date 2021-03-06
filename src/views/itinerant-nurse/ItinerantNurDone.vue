<template>
  <div class="itinerant-nur-done">
    <DoneSummary :options="pageData.options"
                 v-if="pageData?.completeList?.length" />
    <div class="done-list"
         v-if="pageData.completeList.length">
      <van-cell v-for="(list,index) in pageData.completeList"
                :key="index"
                :label="list?.opInfoDTO?.descName || list.descName"
                @click="next(list)"
                is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title v-if="!list.isClean">
          <a href="" :id="`_${list.opPatientDTO.hospitalCode}`"></a>
          <span class="custom-title">{{formatUserName(list.opPatientDTO.name)}}</span>
          <span class="custom-sex">{{list.opPatientDTO.sex === 1 ? '男' : '女'}}</span>
          <span class="custom-age">{{list.opPatientDTO.age}}岁</span>
        </template>
        <template #title v-else>
          <a href="" :id="`_${list.taskId}`"></a>
          <span class="custom-title">清洁消毒</span>
        </template>
        <template #value>
<!--          当前不是清洁消毒任务，并且存在超时时间才显示超时的状态-->
          <span class="info-plantime is-danger " v-if="!list.isClean && list.totalOverTime">
            超时{{ $filters.formatTime(list.totalOverTime) }}
          </span>
<!--          <span style="white-space:nowrap">查看详情</span>-->
        </template>
      </van-cell>
    </div>
    <EmptyPage message="当前暂无完成任务"
               v-if="!pageData?.completeList?.length" />
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SET_OP_TASK_DTO_MUTATION } from '@/store/types/mutation-types';
import Request from '@/service/request';
import useTitleCount from '@/hooks/useTitleCount';
import useTimeInterval from '@/hooks/useTimeInterval';
export default defineComponent({
  name: 'ItinerantNurDone',
  setup() {
    const { updateTitleCount, updateCardCacheData } = useTitleCount();
    const { interval } = useTimeInterval();

    const router = useRouter();
    const store = useStore();
    const pageData:any = reactive({
      options: [],
      completeList: []
    });
    const next = (row: any) => {
      store.commit(SET_OP_TASK_DTO_MUTATION, row);
      router.push({
        path: '/surgical-detail'
      });
    };
    const getData = () => {
      return Request.xhr('queryCompletedOpTask').then((r:any) => {
        const { code, data } = r;
        if (code === 200 && data?.completedOpTaskDetailsDTOList) {
          pageData.options = [
            {
              label: '手术病人',
              value: data.patientNum as any,
            },
            {
              label: '准时率',
              value: data.onTimeNum as any,
              total: data.patientNum as any,
            },
            {
              label: '清洁消毒',
              value: data.cleanNum as any,
            }
          ];
          pageData.completeList = [...data.completedOpTaskDetailsDTOList.map((d:any) => {
            return {
              isClean: false,
              ...d
            };
          }) as any];
        }
        if (data?.completedOpCleanTaskDetailsDTOList) {
          pageData.completeList = [...pageData.completeList, ...data.completedOpCleanTaskDetailsDTOList.map((d:any) => {
            return {
              isClean: true,
              ...d
            };
          })];
        }
        if (code !== 200 || !data) {
          pageData.options = [];
          pageData.completeList = [];
        }
        updateTitleCount(pageData.completeList.length);
        updateCardCacheData(pageData.completeList);
      });
    };

    const events = {

      formatUserName(name: string):string {
        let tmpName = name.trim();
        if (/^[A-Za-z\s]+$/.test(name)) {
          tmpName = name.slice(0, 10);
        } else {
          tmpName = name;
        }
        return tmpName;
      }
    };
    onMounted(() => {
      getData();
      interval(getData);
    });
    return {
      next,
      pageData,
      ...events,
      getData,
      onMounted
    };
  }
});
</script>
