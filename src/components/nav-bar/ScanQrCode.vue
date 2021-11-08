<template>
  <div class="nab-bar">
    <van-nav-bar :title="titleBar" left-arrow @click-left="onClickLeft">
      <template #right>
        <component :is="rightComponent"></component>
        <IconFont icon="icon-kuaijiesaoma" @click="openScanQRCode" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts">
import JsToFlutter from '@/utils/js-to-flutter';
import { defineComponent, getCurrentInstance, ref } from 'vue';
export default defineComponent({
  name: 'ScanQrCode',
  setup(props, { emit }) {
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

    return {
      emitter,
      openScanQRCode,
    };
  },
});
</script>
