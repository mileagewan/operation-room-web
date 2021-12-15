<template>
  <div class="surgical-summary">
    <div class="surgical-summary-item" v-for="(room, index) in doList"
         :key="index" @click="next(room)">

      <template v-if="room.opRoomName">
        <div class="surgical-summary-item_title">
          <span>{{room.opRoomName}}</span>
          <span class="surgical-summary-item_title_status">
            {{formatOpRoomStatus(room.opRoomStatus)}}
          </span>
        </div>
        <div class="surgical-summary-item_middle">
          <div class="surgical-summary-item_number">
            <span class="surgical-summary-item_number_status">
              {{!room.currentOpSeq ? 0 : room.currentOpSeq}}
            </span>
            <span class="surgical-summary-item_number_count">/{{room.totalOpSeq}}</span>
          </div>
          <div class="surgical-summary-item_status">
            <van-tag
              round
              class="opration-tag"
              type="primary"
              :class="[room.currentOpType === 2 ? 'emergency' : 'normal']"
            >{{ room.currentOpType === 2 ? "急诊" : "平诊" }}</van-tag>
          </div>
        </div>

        <div class="surgical-summary-item_bottom">
          <div class="surgical-summary-item_label">进度</div>
          <div :class="{
            'surgical-summary-item_msg': true,
            'surgical-summary-item_msg_danger': !!room.overTime,
          }">
            {{room.currentOpSectionName || '正常'}}
            {{room.overTime ? '超时' +  $filters.formatTime(room.overTime) : ''}}
          </div>

        </div>

      </template>
      <template v-else>
        <div class="surgical-summary-item_title">
          <span>{{room.recoveryRoomName}}</span>
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
              {{room.bedUsable === 1 ? '可用' : '苏醒中'}}
            </span>
          </div>
        </div>

        <div class="surgical-summary-item_bottom_status_CN">
          <div class="surgical-summary-item_label">进度</div>
          <div class="surgical-summary-item_msg">
            {{room.bedUsable === 1 ? '暂无复苏患者' : '患者苏醒中'}}
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
import RcoveryRoomSituationDTO from '@/types/RecoveryRoomSituationDTO';
import RetData from '@/types/RetData';
import OpRoomSituationDTO from '@/types/OpRoomSituationDTO';

export default defineComponent({
  name: 'SurgicalSummary',
  setup() {
    const router = useRouter();
    const store = useStore();
    const doList = ref([]);

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
            Toast('更新成功');
          }
        })
        .catch(() => {
          console.log('Cancel');
        });
    };
    const getData = async () => {
      const ret: RetData<{
        opRoomSituationDTOList: OpRoomSituationDTO[],
        recoveryRoomSituationDTOList: RcoveryRoomSituationDTO[];
      }> = await Request.xhr('queryOpDepartmentSituation');
      const { opRoomSituationDTOList, recoveryRoomSituationDTOList } = ret.data;
      doList.value = [
        ...opRoomSituationDTOList.map(o => {
          return {
            name: o.opRoomName,
            type: 0,
            id: o.opRoomId,
            ...o
          };
        }),
        ...recoveryRoomSituationDTOList.map(r => {
          return {
            name: r.recoveryRoomName,
            type: 1,
            id: r.recoveryRoomId,
            ...r
          };
        })
      ] as any;
      console.log(doList.value);
    };
    const next = (room: any) => {
      store.dispatch(SET_ROOM_ACTION, room);
      router.push(({
        path: '/room-detail',
      }));
    };

    const Events = {
      next,
      getData,
      refresh,

      formatOpRoomStatus(status: number): string {
        switch (status) {
          case 1:
            return '术间可用';
          case 2:
            return '清洁消毒中';
          default:
            return '手术中';
        }
      }
    };

    onMounted(() => {
      getData();
    });
    return {
      doList,
      ...Events,
      onMounted
    };
  },
});
</script>
