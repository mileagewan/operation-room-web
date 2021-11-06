import { ref, computed } from 'vue';
import { Toast } from 'vant';
export default (option: { message: string; seconds: number }): void => {
  const seconds = ref(option.seconds);
  const message = computed(() => `${option.message} ${seconds.value}s`);
  const toast = Toast({
    duration: 0,
    overlay: true,
    message: message.value,
  });
  const timer = setInterval(() => {
    seconds.value--;
    if (seconds.value) {
      toast.message = message.value;
    } else {
      clearInterval(timer);
      Toast.clear();
    }
  }, 1000);
};
