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
import { defineComponent, ref } from 'vue';
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
          userId: '1',
        });
      }, 500);
    };
    beforeEach();
    return {
      isReady,
    };
  },
});
</script>
