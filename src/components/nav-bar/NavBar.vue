<template>
  <div class="nab-bar">
    <van-nav-bar :title="titleBar" left-arrow @click-left="onClickLeft">
      <template #right v-if="rightComponentRef">
        <component :is="rightComponentRef"></component>
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ScanQrCode from './ScanQrCode.vue';
export default defineComponent({
  name: 'NavBar',
  components: {
    ScanQrCode,
  },
  props: {
    title: {
      type: String,
      default: '手术室',
    },
    rightComponent: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const titleBar = ref(props.title);
    const onClickLeft = (): void => {
      emit('goBack');
    };

    const rightComponentRef = ref(props.rightComponent)

    watch(
      () => props.title,
      () => {
        titleBar.value = props.title;
      }
    );

    watch(() => props.rightComponent, () => {
      rightComponentRef.value = props.rightComponent
    })

    return {
      titleBar,
      onClickLeft,
      rightComponentRef
    };
  },
});
</script>
