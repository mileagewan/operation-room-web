<template>
  <div class="surgical-summary">
    <div class="surgical-summary-item" v-for="(room, index) in doList"
         :key="index" @click="next(room)">

      <template v-if="room.name !== '复苏室'">
        <div class="surgical-summary-item_title">
          <span>{{room.name}}</span>
          <span class="surgical-summary-item_title_status">手术中</span>
        </div>
        <div class="surgical-summary-item_middle">
          <div class="surgical-summary-item_number">
            <span class="surgical-summary-item_number_status">
              {{!room.normal ? 0 : room.normal}}
            </span>
            <span class="surgical-summary-item_number_count">/{{room.total}}</span>
          </div>
          <div class="surgical-summary-item_status">
            <van-tag
              round
              class="opration-tag"
              :style="{
            visibility: room.name !== '复苏室'?'visible' : 'hidden'
          }"
              type="primary"
              :class="[room.type === 2 ? 'emergency' : 'normal']"
            >{{ room.type === 2 ? "急诊" : "平诊" }}</van-tag>
          </div>
        </div>

        <div class="surgical-summary-item_bottom">
          <div class="surgical-summary-item_label">进度</div>
          <div class="surgical-summary-item_msg">
            正常
          </div>
          <div class="surgical-summary-item_msg_danger is-danger">
            超时2min
          </div>
        </div>

      </template>
      <template v-else>
        <div class="surgical-summary-item_title">
          <span>{{room.name}}</span>
          <van-tag
            round
            class="opration-tag"
            type="primary"
            :class="[room.type === 2 ? 'emergency' : 'normal']"
          >{{ room.type === 2 ? "急诊" : "平诊" }}</van-tag>
        </div>
        <div class="surgical-summary-item_middle">
          <div class="surgical-summary-item_number">
            <span class="surgical-summary-item_number_status_CN">
              苏醒中
            </span>
          </div>
        </div>

        <div class="surgical-summary-item_bottom">
          <div class="surgical-summary-item_label">进度</div>
          <div class="surgical-summary-item_msg">
            正常
          </div>
        </div>
      </template>

    </div>
  </div>
  <div class="refresh-option" @click="refresh($event)">
    <IconFont icon="icon-gengxin" />
    <div class="refresh-option-title">手术更新</div>
  </div>
  <EmptyPage message="当前暂无手术任务" v-if="!doList.length" />

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Dialog, Toast } from 'vant';
import { useRouter } from 'vue-router';
import Request from '@/service/request';
import { useStore } from 'vuex';
import { SET_ROOM_ACTION } from '@/store/action-types';
import { ReturnData } from '@/types/interface-model';

export default defineComponent({
  name: 'SurgicalSummary',
  setup() {
    const router = useRouter();
    const store = useStore();
    const refresh = (e: MouseEvent) => {
      e.stopPropagation();
      Dialog.confirm({
        title: '手术更新',
        message: '取消手术或增加急诊手术时，需要点击"手术更新"',
      })
        .then(async () => {
          const ret: ReturnData = await Request.xhr('syncOpDatas');
          if (ret.code === 200) {
            getData();
            Toast('更新成功')
          }
        })
        .catch(() => {
          console.log('Cancel')
        });
    };
    const doList = ref([])
    const getData = async () => {
      const ret = await Request.xhr('itinerGetoproomlist')
      doList.value = ret.data.map((d:any) => {
        let type = 1;
        if (d.normal) {
          type = d.dtoList[d.normal - 1]?.opInfo?.type
        }

        return {
          ...d,
          type
        };
      })
      console.log(doList.value)
    }
    const next = (room: any) => {
      store.dispatch(SET_ROOM_ACTION, room)
      router.push(({
        path: '/room-detail',
      }))
    }

    onMounted(() => {
      getData()
    })
    return {
      refresh,
      doList,
      next,
      getData,
      onMounted
    };
  },
});
</script>
