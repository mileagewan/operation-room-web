<template>
  <IconFont icon="icon-kuaijiesaoma" @click="openScanQRCode"/>
</template>

<script lang="ts">
import JsToFlutter from '@/utils/js-to-flutter';
import { defineComponent, getCurrentInstance } from 'vue';
import { Toast } from "vant";

export default defineComponent({
  name: 'ScanQrCode',
  setup() {
    // TODO 看是否有更好的方式取到全局注入的emitter类
    const { appContext }: any = getCurrentInstance();
    const emitter: any = appContext.config.globalProperties.emitter;
    const openScanQRCode = () => {
      JsToFlutter.startScanQRCode().then((res) => {
        if (!res) {
          Toast('无效二维码');
          return;
        }
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
