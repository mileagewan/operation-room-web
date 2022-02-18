<template>
  <div class="room-detail">
    <nav-bar :title="row.title" @goBack="goBack" />
    <div class="room-detail-content">
      <van-pull-refresh v-model="loading"
                        v-if="roomList.length"
                        @refresh="onRefresh">
        <ExpandCard v-for="(list,index) in roomList"
                    :key="index"
                    :option="{
                      status: list.opInfoDTO.opSectionCode,
                      name: list.opPatientDTO.name,
                      sex: list.opPatientDTO.sex,
                      age: list.opPatientDTO.age,
                      type: list.opInfoDTO.type,
                      room: list.opInfoDTO.descName,
                      planTime: list.overTime
                    }"
        >
          <KeyValue
            v-for="(item, i) in list.taskList"
            :value="item.value"
            :danger="item.danger"
            :key="i"
          >
            <template #label>
              {{ item.label }}
            </template>
          </KeyValue>
          <KeyValue label="状态节点" v-if="list.flowData && list.flowData.length">
            <template #value>
              <FlowChart :flow-data="list.flowData"
                         :current-code="list.currentCode" />
            </template>
          </KeyValue>
          <KeyValue :label="list.opTaskDTO?.roleName"
                    important
                    v-if="list.opTaskDTO"
                    :value="`${list.opTaskDTO?.exeUserName || '-'} ${list.opTaskDTO?.exeUserPhone || '-'}`" />
          <KeyValue :label="list.nextOpTaskDTO?.roleName"
                    v-if="list.nextOpTaskDTO"
                    important
                    :value="`${list.nextOpTaskDTO?.exeUserName || '-'} ${list.nextOpTaskDTO?.exeUserPhone || '-'}`" />
          <template v-if="list.opInfoDTO.opSectionCode === '16'">
            <KeyValue label="患者返回"
                      :value="list.opPatientDTO.beforeDepartmentWardName" />
          </template>
        </ExpandCard>
      </van-pull-refresh>
      <EmptyPage v-if="!roomList.length"></EmptyPage>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useTaskMixins, {
  anesthesiaDicCode,
  anesthetistName,
  beforeDiseaseName,
  circulatingNurseName,
  departmentName,
  hospitalCode,
  infectType,
  opInfoCode,
  opInfoName,
  surgeonName
} from '../../utils/task-mixins';
import RetData from '@/types/RetData';
import OpInfoDTO from '@/types/OpInfoDTO';
import OpInfoExtDTO from '@/types/OpInfoExtDTO';
import OpPatientDTO from '@/types/OpPatientDTO';
import OpTaskDTO from '@/types/OpTaskDTO';
import Request from '@/service/request';
import { iconMaps } from '@/views/chief-coordination-nurse/iconMaps';
import useTimeInterval from '@/hooks/useTimeInterval';
import { findNode } from '@/utils/utils';

interface ListItem {
  opSectionNames: any[];
  opInfoDTO: OpInfoDTO;
  opInfoExtDTO: OpInfoExtDTO;
  opPatientDTO: OpPatientDTO;
  overTime: number;
  opTaskDTO: OpTaskDTO;
  lastOpTaskDTO: OpTaskDTO;
  nextOpTaskDTO: OpTaskDTO;
}

export default defineComponent({
  name: 'RoomDetail',
  setup() {
    const { formatTask } = useTaskMixins();
    const { interval } = useTimeInterval();

    const router = useRouter();
    const store = useStore();

    const list = [
      opInfoCode(),
      hospitalCode(),
      departmentName(),
      surgeonName(),
      circulatingNurseName(),
      anesthetistName(),
      anesthesiaDicCode(),
      infectType(),
      opInfoName(),
      beforeDiseaseName(),
    ];
    const row = ref({
      title: ''
    });
    const loading = ref<boolean>(false);
    const room = computed(() => {
      const room: any = store.state.chiefNur.room;
      return room;
    });

    const roomList = ref([]);

    const Events = {
      async onRefresh() {
        await Events.getData();
        loading.value = false;
      },

      goBack: () => {
        router.back();
      },

      setTitle: () => {
        row.value.title = String(room.value.nameAll);
      },

      getData: async () => {
        const key = room.value.type ? 'queryRecoveryRoomOpDetailsList' : 'queryOpRoomOpDetailsList';
        const paramsKey = room.value.type ? 'recoveryRoomId' : 'opRoomId';
        const ret: RetData<ListItem[]> = await Request.xhr(key, {
          [paramsKey]: room.value.id
        });
        const { code, data } = ret;
        if (code === 200 && data) {
          roomList.value = data.map((d:any) => {
            const { adjacentOpSectionDetailsDTOList }: any = d;
            const point = findNode(adjacentOpSectionDetailsDTOList || [], (d: any) => {
              return d.currentOpSection === 1;
            });
            const flowData: Array<{
              title: string;
              code:string;
              icon: any;
            }> = (d.adjacentOpSectionDetailsDTOList || []).map((ad:any) => {
              return {
                title: ad.opSectionName,
                code: ad.opSectionCode,
                icon: iconMaps.get(ad.opSectionCode) || 'icon-weikaishishoushu'
              }
            })

            return {
              ...d,
              taskList: formatTask(d, list),
              currentCode: point?.opSectionCode,
              flowData: flowData
            };
          }) as any;
        } else {
          roomList.value = [];
        }
      }
    };

    Events.setTitle();
    Events.getData();

    if (!Object.keys(room.value).length) {
      router.push({
        path: '/pda-views'
      });
    }

    onMounted(() => {
      interval(Events.getData);
    })

    return {
      row,
      loading,
      roomList,
      ...Events,
      onMounted
    };
  }
});
</script>
