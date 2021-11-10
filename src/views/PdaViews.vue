<template>
  <div class="pda-views">
    <nav-bar @goBack="goBack" right-component="ScanQrCode" />
    <van-tabs v-model:active="active" swipeable>
      <van-tab
        v-for="(cmponentItem, index) in componentsList"
        :key="cmponentItem.component"
        :title="cmponentItem.label"
      >
        <van-pull-refresh
          v-model="loading"
          @refresh="onRefresh(index)"
        >
          <component :is="cmponentItem.component"
                     :ref="setItemRef" />
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
import { SET_ACTIVE_MUTATION } from '@/store/mutation-types';
export default defineComponent({
  name: 'PdaViews',
  components,
  setup() {
    const store = useStore();

    const loading = ref<boolean>(false);
    const active = computed({
      get() {
        return store.state.active
      },
      set(value) {
        store.commit(SET_ACTIVE_MUTATION, value)
      }
    });
    const defaultRole = computed(() => {
      const userInfo = store.state.userInfo
      return userInfo.role;
    });

    const goBack = (): void => {
      JsToFlutter.goback();
    };
    const onRefresh = (index:number):void => {
      itemRefs[index].getData().finally(() => {
        loading.value = false;
      })
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

    const itemRefs:any[] = []
    const setItemRef = (el:HTMLElement) => {
      if (el) {
        itemRefs.push(el)
      }
    }
    return {
      loading,
      active,
      defaultRole,
      getComponentsList,
      componentsList,
      goBack,
      onRefresh,
      setItemRef
    };
  },
});
</script>
