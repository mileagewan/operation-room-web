<template>
  <div class="pda-views">
    <nav-bar @goBack="goBack" :right-component="ScanQrCode"/>
    <van-tabs v-model:active="active" swipeable :lazy-render="false">
      <van-tab
        v-for="(cmponentItem, index) in componentsList"
        :key="cmponentItem.component"
        :title="`${cmponentItem.label}${titleCount[cmponentItem.component] ? `(${titleCount[cmponentItem.component]})` : ''}`"
      >
        <van-pull-refresh v-model="loading" @refresh="onRefresh(index)">
          <component :is="cmponentItem.component"
                     :ref="el => setItemRef(el,index)"/>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { components, RoleModuleInject } from '@/views/role-module-inject';
import { RoleModuleItem } from '@/types/interface-model';
import JsToFlutter from '@/utils/js-to-flutter';
import { SET_ACTIVE_MUTATION } from '@/store/mutation-types';
import { Toast } from 'vant';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'PdaViews',
  components,
  setup() {
    const store = useStore();
    const route = useRoute();
    const loading = ref<boolean>(false);
    const { appContext, }: any = getCurrentInstance();
    const emitter: any = appContext.config.globalProperties.emitter;

    const ScanQrCode = ref<string>('ScanQrCode');

    const active = computed({
      get() {
        const value = store.state.active
        try {
          itemRefs.length && itemRefs[value].getData();
        } catch (e) {
          console.log(e);
        }
        return store.state.active;
      },
      set(value: number) {
        store.commit(SET_ACTIVE_MUTATION, value);
      },
    });
    const defaultRole = computed(() => {
      const userInfo = store.state.userInfo;
      return userInfo.role;
    })

    const titleCount = computed(() => {
      return store.state.titleCount;
    })

    const cardCacheData = computed(() => {
      return store.state.cardCacheData
    })

    const getComponentsList = (defaultRole: string) => {
      const map = new Map<string, RoleModuleItem[]>();
      for (const item of RoleModuleInject) {
        map.set(item.role, item.lists);
      }

      const lists = map.get(defaultRole);
      return lists || [];
    };

    const componentsList = reactive(getComponentsList(defaultRole.value));

    const itemRefs: any[] = [];
    const setItemRef = (el: HTMLElement, index: number) => {
      if (el) {
        itemRefs[index] = el;
      }
    };

    const goBack = (): void => {
      JsToFlutter.goback();
    };

    const onRefresh = (index: number): void => {
      itemRefs[index].getData().finally(() => {
        loading.value = false;
      });
    };

    const findSanCodeDataIndex = (id: string): any => {
      let active;
      let data;
      const dataArray = componentsList.map((component: any) => {
        const key = component.component;
        return cardCacheData.value[key];
      })
      for (let i = 0; i < dataArray.length; i++) {
        const datas = dataArray[i];
        if (!datas) {
          continue;
        }
        if (datas.some((d: any) => String(d.patient.hospitalCode) === String(id))) {
          active = i;
          data = datas.filter((d: any) => {
            return d.patient.hospitalCode === String(id)
          })[0];
        }

        if (active !== undefined) {
          break
        }
      }
      return {
        index: active,
        data
      };
    }

    const Events = {
      goBack,
      onRefresh,
      setItemRef,

      setScanQrCode() {
        if (defaultRole.value === 'CoordinateNurse') {
          ScanQrCode.value = ''
        }
      },

      notifyFlutterRead() {
        const { query } = route;
        if (query.id) {
          JsToFlutter.notifyFlutterRead(query.id as string);
        }
      }
    }

    onMounted(() => {
      emitter.on('scan-code-success', (id: string) => {
        const { data, index } = findSanCodeDataIndex(id);
        if (index === undefined) {
          Toast('未查询到该患者的今日手术信息')
          return
        }
        active.value = index
        const returnEle: any = document.querySelector('#_' + id);
        if (returnEle) {
          if (returnEle.parentElement.querySelector('.van-icon-scan')) {
            const refComponent: any = itemRefs[index];
            refComponent.codeHandle(data, id)
          } else {
            setTimeout(() => {
              returnEle.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
              });
              itemRefs.map((component: any) => component.$forceUpdate());
            }, 500)
          }
        }
      });
      Events.notifyFlutterRead();
      Events.setScanQrCode();
    })

    return {
      loading,
      active,
      ScanQrCode,
      defaultRole,
      getComponentsList,
      componentsList,
      titleCount,
      ...Events,
      onMounted
    };
  },
});
</script>
