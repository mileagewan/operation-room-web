<template>
  <div class="itinerant-nur-done">
    <DoneSummary :options="pageData.options" v-if="pageData.completeList.length" />
    <div class="done-list" v-if="pageData.completeList.length">
      <van-cell value="查看详情"
                v-for="(list,index) in pageData.completeList"
                :key="index"
                :label="list.opInfo.departmentName"
                @click="next(list)"
                is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">{{list.patient.name}}</span>
          <span>{{list.patient.sex}}</span>
          <span>{{list.patient.age}}</span>
        </template>
      </van-cell>
    </div>
    <EmptyPage message="当前暂无完成任务" v-if="!pageData.completeList.length" />
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
// import Request from '@/service/request';
import { testCompleteTotal } from '@/utils/mock-test-data';
import { useStore } from 'vuex';
import { SET_OP_TASK_DTO_MUTATION } from '@/store/mutation-types';
export default defineComponent({
  name: 'ItinerantNurDone',
  setup() {
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
    const getData = async (): Promise<any> => {
      // let ret = await Request.xhr('itinerGettotaltask')
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 200)
      })
      const ret = testCompleteTotal.data;
      pageData.options = [
        {
          label: '送病人',
          value: ret.sendPatient as any,
        },
        {
          label: '接病人',
          value: ret.receivePatient as any,
        }
      ];
      pageData.completeList = ret.opTaskListingDTOList as any
    }

    onMounted(() => {
      getData()
    })
    return {
      next,
      pageData,
      onMounted
    }
  }
})
</script>

<style scoped>

</style>
