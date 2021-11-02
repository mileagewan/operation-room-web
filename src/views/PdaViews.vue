<template>
  <div class="pda-views">
    <nav-bar @goBack="goBack" />
    <van-tabs v-model:active="active">
      <van-tab title="当前任务(1)">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <TaskView>
           <template #header>
             <PatientDetail />
           </template>
           <template #content>
             <KeyValue v-for="(v,i) in taskList"
                       :value="v.value"
                       :danger="v.danger"
                       :key="i">
               <template #label>
                 {{v.label}}
               </template>
             </KeyValue>
             <KeyValue label="状态节点">
               <template #value>
                 <FlowChart></FlowChart>
               </template>
             </KeyValue>
             <KeyValue label="手术室接送护士"
                       important
                       value="阿斯顿 13800138000" />
             <KeyValue label="巡回护士电话"
                       important
                       value="阿斯顿 13800138000" />
           </template>
          </TaskView>

        </van-pull-refresh>
      </van-tab>
      <van-tab title="手术汇总">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          标签 1
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { TaskList } from '@/utils/mock-test-data'

export default defineComponent({
  name: 'PdaViews',
  setup(props, { emit }) {
    const loading = ref<boolean>(false)
    const taskList = reactive(TaskList)
    const active = ref<number>(0)
    const router = useRouter()
    const goBack = ():void => {
      router.back()
    }
    const onRefresh = (): void => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
    return {
      loading,
      active,
      taskList,
      goBack,
      onRefresh
    }
  }
})
</script>
