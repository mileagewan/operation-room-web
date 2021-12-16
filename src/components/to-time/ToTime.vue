<template>
  <van-button
    round
    class="default-button"
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
    const formatToTimeInterval = (): string => {
      let s = props.time;
      if (props.time) {
        clearInterval(timer);
        timer = setInterval(() => {
          s--;
          if (s === 0) {
            clearInterval(timer);
            showTime.value = false;
          } else {
            const min = Math.floor(s / 60);
            const second = s % 60;
            toTime.value = `${min}:${second < 10 ? `0${second}` : second}`;
            showTime.value = true;
          }
          disabledReal.value = showTime.value;
        }, 1000);
      }
    };

    const Events = {
      broadcast: () => {
        emit('click');
      },
    };

    onMounted(() => {
      formatToTimeInterval();
    });
    onUnmounted(() => {
      clearInterval(timer);
    });
    return {
      disabledReal,
      toTime,
      showTime,
      ...Events,
      onMounted,
      onUnmounted,
    };
  },
});
</script>
