<template>
  <div class="pda-views">
    <nav-bar @goBack="goBack" />
    <van-tabs v-model:active="active">
      <van-tab v-for="cmponentItem in componentsList"
               :key="cmponentItem.component"
               :title="cmponentItem.label">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">

          <component :is="cmponentItem.component"></component>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { components, RoleModuleInject } from '@/views/role-module-inject';
import { RoleModuleItem } from '@/types/interface-model';
export default defineComponent({
  name: 'PdaViews',
  components,
  setup(props, { emit }) {
    const loading = ref<boolean>(false)
    const active = ref<number>(0)
    const defaultRole = ref('4')

    const router = useRouter()
    const goBack = ():void => {
      window.flutter_inappwebview.callHandler('jsCallFlutter', 'goback')
    }
    const onRefresh = (): void => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    const getComponentsList = (defaultRole: string) => {
      const map = new Map<string, RoleModuleItem[]>();
      for (const item of RoleModuleInject) {
        map.set(item.role, item.lists);
      }

      const lists = map.get(defaultRole);
      return lists || []
    }

    const componentsList = reactive(getComponentsList(defaultRole.value));

    return {
      loading,
      active,
      defaultRole,
      getComponentsList,
      componentsList,
      goBack,
      onRefresh,
    }
  }
})
</script>
