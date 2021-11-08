<template>
  <div class="nab-bar">
    <van-nav-bar
      :title="titleBar"
      left-arrow
      @click-left="onClickLeft"
      @click-right="openScanQRCode"
    >
      <template #right>
        <IconFont icon="icon-kuaijiesaoma" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import JsToFlutter from '@/utils/js-to-flutter';
import { defineComponent, getCurrentInstance, ref, watch } from 'vue';

export default defineComponent({
  name: 'NavBar',
  inject: ['emitter'],
  props: {
    title: {
      type: String,
      default: '手术室',
    },
  },
  setup(props, { emit }) {
    const titleBar = ref(props.title);
    const onClickLeft = (): void => {
      emit('goBack');
    };
    // TODO 看是否有更好的方式取到全局注入的emitter类
    const { appContext }: any = getCurrentInstance();
    const emitter: any = appContext.config.globalProperties.emitter;
    const openScanQRCode = () => {
      // emitter.emit('scan-code-success', '扫码结果');
      JsToFlutter.startScanQRCode().then((res) => {
        // console.log(res);
        // 扫码成功，emit事件
        emitter.emit('scan-code-success', res);
      });
    };

    watch(() => props.title, () => {
      titleBar.value = props.title
    })

    return {
      emitter,
      titleBar,
      onClickLeft,
      openScanQRCode
    };
  },
});
</script>
