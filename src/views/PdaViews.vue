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
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { components, RoleModuleInject } from '@/views/role-module-inject';
import { RoleModuleItem } from '@/types/interface-model';
import JsToFlutter from '@/utils/js-to-flutter';
import { SET_ACTIVE_MUTATION } from '@/store/mutation-types';
import { Toast } from 'vant';
import RetData from '@/types/RetData';
import Request from '@/service/request';
import { findNode } from '@/utils/utils';
import useNotifyFlutter from '@/mixins/useNotifyFlutter';

export default defineComponent({
  name: 'PdaViews',
  components,
  setup() {
    const store = useStore();
    const { notifyFlutterRead } = useNotifyFlutter();
    const { appContext }: any = getCurrentInstance();
    const loading = ref<boolean>(false);
    const emitter: any = appContext.config.globalProperties.emitter;

    const ScanQrCode = ref<string>('ScanQrCode');

    const active = computed({
      get() {
        const value = store.state.active;
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
      return userInfo.user?.positionDicItemCode;
    });

    const titleCount = computed(() => {
      return store.state.titleCount;
    });

    const cardCacheData = computed(() => {
      return store.state.cardCacheData;
    });

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

    /**
     * 通过公共扫码来获取当前数据和索引
     * @param id
     */
    const findSanCodeDataIndex = (id: string): any => {
      let active;
      let data;
      const dataArray = componentsList.map((component: any) => {
        const key = component.component;
        return cardCacheData.value[key];
      });
      for (let i = 0; i < dataArray.length; i++) {
        const datas = dataArray[i];
        if (!datas) {
          continue;
        }
        if (datas.some((d: any) => String(d.opPatientDTO.hospitalCode) === String(id))) {
          active = i;
          data = findNode(datas, (d: any) => {
            return d.opPatientDTO.hospitalCode === String(id);
          });
        }

        if (active !== undefined) {
          break;
        }
      }
      return {
        index: active,
        data
      };
    };

    const Events = {
      goBack,
      onRefresh,
      setItemRef,

      /**
       * 总协调护士不需要公共扫码功能
       */
      setScanQrCode() {
        if (defaultRole.value === 'CoordinateNurse') {
          ScanQrCode.value = '';
        }
      },

      /**
       * 通知flutter端进行红点更新
       */
      async notifyFlutterRead() {
        notifyFlutterRead()
      },

      /**
       * 跳转到指定卡片
       * @param id 住院号
       */
      async jumpTargetCard(id:string) {
        const ret: RetData<any> = await Request.xhr(
          'flowReverScanNext',
          {
            hospitalCode: id,
            opTaskId: 0
          }
        );
        if (ret.code !== 200) {
          Toast(ret.msg);
          return;
        }
        const { data, index } = findSanCodeDataIndex(id);
        if (index === undefined) {
          Toast('未查询到该患者的今日手术信息');
          return;
        }
        active.value = index;
        const returnEle: any = document.querySelector('#_' + id);
        if (returnEle) {
          // if (returnEle.parentElement.querySelector('.van-icon-scan')) {
          // // 自动交接
          // const refComponent: any = itemRefs[index];
          // refComponent.codeHandle(data, id);
          // } else {
          setTimeout(() => {
            console.log(data);
            returnEle.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest'
            });
            itemRefs.map((component: any) => component.$forceUpdate());
          }, 500);
          // }
        }
      },

      /**
       * 外层工作台扫码进行交接
       */
      async scanByOut() {
        const ret: string = await JsToFlutter.getPatientIdByWorkspace();
        if (!ret) {
          return;
        }
        // 总协调隔一段时间直接更新
        if (defaultRole.value === 'CoordinateNurse') {
          setTimeout(() => {
            Events.jumpTargetCard(ret);
          }, 500);
        } else {
          // 遍历数据，当数据都有时候直接更新
          const timer = setInterval(() => {
            const isReady = componentsList.every(c => {
              return !!cardCacheData.value[c.component];
            })
            if (isReady) {
              clearInterval(timer);
              nextTick(() => {
                Events.jumpTargetCard(ret);
              })
            }
          }, 100);
        }
      }
    };

    onMounted(() => {
      emitter.on('scan-code-success', Events.jumpTargetCard);
      Events.notifyFlutterRead();
      Events.setScanQrCode();
      Events.scanByOut();
    });

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
