<template>
  <div class="itinerant-nur-done">
    <DoneSummary :options="pageData.options" v-if="pageData.completeList.length" />
    <div class="done-list" v-if="pageData.completeList.length">
      <van-cell v-for="(list,index) in pageData.completeList"
                :key="index"
                :label="list.opInfo.opDescName"
                @click="next(list)"
                is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">{{list.patient.name}}</span>
          <span class="custom-sex">{{list.patient.sex === 1 ? '男' : '女'}}</span>
          <span class="custom-age">{{list.patient.age}}岁</span>
        </template>
        <template #value>
          <span class="info-plantime is-danger">
            超时3分10秒
          </span>
          <span>查看详情</span>
        </template>
      </van-cell>
    </div>
    <EmptyPage message="当前暂无完成任务" v-if="!pageData.completeList.length" />
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SET_OP_TASK_DTO_MUTATION } from '@/store/mutation-types';
import Request from '@/service/request';
import useTitleCount from '@/utils/useTitleCount';
export default defineComponent({
  name: 'ItinerantNurDone',
  setup() {
    const { updateTitleCount } = useTitleCount()
    const router = useRouter();
    const store = useStore();
    const pageData:any = reactive({
      options: [],
      completeList: []
    })
    const next = (row: any) => {
      store.commit(SET_OP_TASK_DTO_MUTATION, row)
      router.push({
        path: '/surgical-detail'
      })
    }
    const getData = () => {
      return Request.xhr('queryCompletedTaskList').then((r:any) => {
        const { code, data } = r;
        if (code === 200) {
          pageData.options = [
            {
              label: '手术病人',
              value: data.patientNum as any,
            },
            {
              label: '准时率',
              value: data.onTimeRate as any,
            }
          ];
          pageData.completeList = data.opTaskListingDTOList as any
        } else {
          pageData.options = [];
          pageData.completeList = []
        }
        updateTitleCount(pageData.completeList.length)
      })
    }

    onMounted(() => {
      getData()
    })
    return {
      next,
      pageData,
      getData,
      onMounted
    }
  }
})
</script>

<style scoped>

</style>
