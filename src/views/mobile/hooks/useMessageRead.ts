import { onMounted } from 'vue'
import Request from "@/service/request";
import { ReturnData } from "@/types/interface-model";
import { useRoute } from "vue-router";
function useMessageRead(): string {
  const route = useRoute();
  onMounted(() => {
    msgReadApi()
  })
  const msgReadApi = async () => {
    if (route.query?.msgId && route.query?.type === "app") {
      const params = `id=${route.query?.msgId}`
      await Request.xhr('appMsgRead', {}, params).then((r: ReturnData) => {
        if (r.code === 200) {
          console.log('消息已读')
        }
      })
    }
  }
  return ''
}
export default useMessageRead
