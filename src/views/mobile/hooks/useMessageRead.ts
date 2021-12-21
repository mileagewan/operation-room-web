import { onMounted } from 'vue'
import Request from "@/service/request";
import { ReturnData } from "@/types/interface-model";
import { useRoute } from "vue-router";
import JsToFlutter from "@/utils/js-to-flutter";
function useMessageRead(): string {
  const route = useRoute();
  onMounted(() => {
    msgReadApi()
  })
  const msgReadApi = async () => {
    if (route.query?.msgid && route.query?.type === "app") {
      const params = `id=${route.query?.msgid}`
      await Request.xhr('appMsgRead', {}, params).then((r: ReturnData) => {
        if (r.code === 200) {
          console.log('消息已读')
          JsToFlutter.notifyFlutterRead(route.query.msgid as string);
        }
      })
    }
  }
  return ''
}
export default useMessageRead
