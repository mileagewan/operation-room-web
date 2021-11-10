<template>
  <div class="surgical-summary">
    <div class="surgical-summary-item" v-for="(room, index) in doList"
         :key="index" @click="next(room)">
      <div class="surgical-summary-item_title">{{room.name}}</div>
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
      <div class="surgical-summary-item_number" v-if="room.name !== '复苏室'">
        <span class="surgical-summary-item_number_status">
          {{!room.normal ? 0 : room.normal}}
        </span>
        <span class="surgical-summary-item_number_count">/{{room.total}}</span>
      </div>
      <div class="surgical-summary-item_number" v-else>
         <span class="surgical-summary-item_number_status">
          {{room.dtoList.length}}
        </span>
        <span class="surgical-summary-item_number_count">人</span>
      </div>
      <div class="surgical-summary-item_label">{{room.name !== '复苏室' ? '手术状态' : '床位状态'}}</div>
      <div class="surgical-summary-item_msg">
        {{room.name !== '复苏室' ? '正常' : `${room.bedNumber - room.dtoList.length}个空位`}}
      </div>
    </div>
  </div>
  <div class="refresh-option" @click="refresh($event)">
    <van-icon name="replay" />
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
