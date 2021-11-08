<template>
  <router-view v-if="isReady"/>
  <van-loading
    v-if="!isReady"
    class="app-isReady"
    type="spinner"
    color="#1989fa"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { SET_USER_INFO_ACTION } from '@/store/action-types';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const isReady = ref<boolean>(false);
    const beforeEach = () => {
      setTimeout(() => {
        isReady.value = true;
        store.dispatch(SET_USER_INFO_ACTION, {
          userId: '4',
        });
      }, 500);
    };
    onMounted(() => {
      // 监听flutter透传的刷新操作
      window.addEventListener('flutterCallJS', function (event: any) {
        const { detail } = event
        switch (detail.handleName) {
          case 'or/refreshContent':
            isReady.value = false
            beforeEach()
            break;
          default:
            console.log('default');
            break
        }
      }, false);
      // window.addEventListener('flutterInAppWebViewPlatformReady',
      //   async () => {
      //     beforeEach()
      //   });

      beforeEach()
    })

    return {
      isReady,
    };
  },
});
</script>
