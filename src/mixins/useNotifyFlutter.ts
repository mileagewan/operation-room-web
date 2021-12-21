import RetData from '@/types/RetData';
import Request from '@/service/request';
import JsToFlutter from '@/utils/js-to-flutter';
import { useRoute } from 'vue-router';

export default function useNotifyFlutter () {
  const route = useRoute();

  const Events = {
    /**
     * 通知flutter端进行红点更新
     */
    async notifyFlutterRead() {
      const { query } = route;
      if (query.msgid) {
        const ret: RetData<any> = await Request.xhr('updateRead', {
          id: query.msgid
        });
        const { code } = ret;
        if (code === 200) {
          JsToFlutter.notifyFlutterRead(query.msgid as string);
        }
      }
    },
  }

  return Events;
}
