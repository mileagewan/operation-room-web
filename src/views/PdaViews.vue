<template>
  <div class="pda-views">
    <nav-bar @goBack="goBack" right-component="ScanQrCode" />
    <van-tabs v-model:active="active">
      <van-tab
        v-for="(cmponentItem, index) in componentsList"
        :key="cmponentItem.component"
        :title="cmponentItem.label"
      >
        <van-pull-refresh
          v-model="loading"
          @refresh="onRefresh"
          v-if="active === index"
        >
          <component :is="cmponentItem.component"></component>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { components, RoleModuleInject } from '@/views/role-module-inject';
import { RoleModuleItem } from '@/types/interface-model';
import JsToFlutter from '@/utils/js-to-flutter';
export default defineComponent({
  name: 'PdaViews',
  components,
  setup() {
    const store = useStore();

    const loading = ref<boolean>(false);
    const active = ref<number>(0);
    const defaultRole = computed(() => {
      const userConfig = store.state.userInfo.userConfig
      return '2'
    });

    const goBack = (): void => {
      JsToFlutter.goback();
    };
    const onRefresh = (): void => {
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    const getComponentsList = (defaultRole: string) => {
      const map = new Map<string, RoleModuleItem[]>();
      for (const item of RoleModuleInject) {
        map.set(item.role, item.lists);
      }

      const lists = map.get(defaultRole);
      return lists || [];
    };

    const componentsList = reactive(getComponentsList(defaultRole.value));
    // TODO store 保存各项任务数据
    // console.log(componentsList);
    // componentsList.forEach((item:RoleModuleItem) => {
    //   console.log(item.component);
    // })
    return {
      loading,
      active,
      defaultRole,
      getComponentsList,
      componentsList,
      goBack,
      onRefresh,
    };
  },
});
</script>
