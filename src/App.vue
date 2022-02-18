<template>
  <router-view v-if="isReady" />
  <van-loading
    v-if="!isReady"
    class="app-isReady"
    type="spinner"
    color="#1989fa"
  />
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { SET_USER_INFO_ACTION } from '@/store/types/action-types';
import Request from '@/service/request';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const isReady = ref<boolean>(false);

    const beforeEach = async () => {
      const ret: any = await Request.xhr('getMenuTree');
      isReady.value = true;
      store.dispatch(SET_USER_INFO_ACTION, ret.data);
    };

    onMounted(() => {
      // 监听flutter透传的刷新操作
      window.addEventListener(
        'flutterCallJS',
        function (event: any) {
          console.log(event);
          const { detail } = event;
          switch (detail.handleName) {
            case 'or/refreshContent': // 消息推送时候
              isReady.value = false;
              beforeEach();
              break;
            case 'common/appLifecycle': // 亮屏或者后台进入前台
              if (detail.data === 'AppLifecycleState.resumed') {
                isReady.value = false;
                nextTick(() => {
                  isReady.value = true;
                })
              }
              break;
            default:
              console.log('default');
              break;
          }
        },
        false
      );
      // flutter环境
      if (window.flutter_inappwebview) {
        window.addEventListener('flutterInAppWebViewPlatformReady',
          async () => {
            beforeEach();
          });
      } else {
        beforeEach()
      }
    });

    return {
      isReady,
    };
  },
});
</script>
