<template>
  <van-button
    round
    class="to-time"
    :disabled="disabledReal"
    color="rgba(0,172,242,0.05)"
    @click="broadcast"
  >
    <slot v-if="!showTime"></slot>
    <span v-else> {{ toTime }}</span>
  </van-button>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
export default defineComponent({
  name: 'ToTime',

  props: {
    time: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [Number, String],
      default: 1,
    }
  },

  setup(props, { emit }): any {
    const disabledReal = ref(props.disabled);
    const showTime = ref(false);

    watch(
      () => props.disabled,
      (v: boolean) => {
        disabledReal.value = v;
      }
    );

    watch(
      () => props.time,
      () => {
        formatToTimeInterval();
      }
    );

    let timer: number;
    const toTime = ref('');
    let s = 0;

    /**
     * 格式化时间为 xx：xx
     *
     * @param s
     */
    function formatToTimeLoading(s:number) {
      const min = Math.floor(s / 60);
      const second = s % 60;
      toTime.value = `${min}:${second < 10 ? `0${second}` : second}`;
      showTime.value = true;
    }

    const formatToTimeInterval = (): void => {
      s = s || props.time;
      if (s) {
        clearInterval(timer);
        formatToTimeLoading(s);
        timer = setInterval(() => {
          s--;
          if (s === 0) {
            clearInterval(timer);
            showTime.value = false;
            localStorage.removeItem(String(props.id));
          } else {
            formatToTimeLoading(s);
            // 将当前倒计时的时间存在本地，后续刷新或者进入的时候，取当前的时间来进行倒计时
            const curTime = new Date().getTime();
            localStorage.setItem(String(props.id), String(curTime + s * 1000));
          }
          disabledReal.value = showTime.value;
        }, 1000);
      } else {
        const casheCurTime = Number(localStorage.getItem(String(props.id))) || new Date().getTime();
        const curTime = new Date().getTime();
        if (curTime < casheCurTime) {
          s = Math.ceil((casheCurTime - curTime) / 1000);
          formatToTimeLoading(s);
          formatToTimeInterval()
        } else {
          clearInterval(timer);
          showTime.value = false;
        }
        disabledReal.value = showTime.value;
      }
    };

    const CmpDatas = {
      disabledReal,
      toTime,
      showTime
    }

    const CmpEvents = {
      broadcast: () => {
        emit('clickPublic');
      },
    };

    onMounted(() => {
      formatToTimeInterval();
    });
    onUnmounted(() => {
      clearInterval(timer);
    });
    return {
      ...CmpDatas,
      ...CmpEvents,
      onMounted,
      onUnmounted,
    };
  },
});
</script>
