<template>
  <router-view v-if="isReady" />
  <van-loading v-if="!isReady"
               class="app-isReady"
               type="spinner"
               color="#1989fa" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { SET_USER_INFO_ACTION } from '@/store/action-types';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();

    const isReady = ref<boolean>(false)
    const beforeEach = () => {
      setTimeout(() => {
        isReady.value = true
        store.dispatch(SET_USER_INFO_ACTION, {
          userId: '1'
        })
      }, 2000)
    };
    onMounted(() => {
      beforeEach()
    })
    return {
      isReady
    }
  }
})
</script>
