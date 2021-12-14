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
          <template v-if="isOnOperation.indexOf(list.opInfoDTO.opSectionCode) > -1">
            <KeyValue label="状态节点">
              <template #value>
                <FlowChart :flow-data="list.flowData"
                           :current-code="list.currentCode" />
              </template>
            </KeyValue>
            <KeyValue label="手术室接送护士"
                      important
                      :value="`${list.handoverPerson?.name} ${list.handoverPerson?.phone}`" />
            <KeyValue label="巡回护士电话"
                      important
                      :value="`${list.responsiblePerson?.name} ${list.responsiblePerson?.phone}`" />
          </template>
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
import { computed, defineComponent, ref } from 'vue';
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
    const map = new Map<number, any>([
      [6, {
        title: '到手术室',
        icon: 'icon-shoushushi1'
      }],
      [7, {
        title: '到手术间',
        icon: 'icon-shoushujian'
      }],
      [8, {
        title: '麻醉',
        icon: 'icon-mazui'
      }],
      [9, {
        title: '手术中',
        icon: 'icon-shoushuzhong'
      }],
      [10, {
        title: '苏醒',
        icon: 'icon-suxing'
      }]
    ]);

    const router = useRouter();
    const store = useStore();
    const { formatTask } = useTaskMixins();
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
    const isOnOperation = ref<string[]>([
      '6',
      '7',
      '8',
      '9',
      '10',
    ]);
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
        row.value.title = String(room.value.name);
      },

      getData: async () => {
        const key = room.value.type ? 'queryRecoveryRoomOpDetailsList' : 'queryOpRoomOpDetailsList';
        const ret: RetData<ListItem[]> = await Request.xhr(key, {
          id: room.value.id
        });
        const { code, data } = ret;
        if (code === 200 && data) {
          roomList.value = data.map(d => {
            const currentCode = Number(d.opInfoDTO.opSectionCode);
            let flowData: any[] = [];
            if (currentCode > 6 && currentCode < 10) {
              flowData = [
                {
                  ...map.get(currentCode - 1) as any,
                  code: currentCode - 1,
                },
                {
                  ...map.get(currentCode),
                  code: currentCode
                },
                {
                  ...map.get(currentCode + 1),
                  code: currentCode + 1
                }
              ];
            } else if (currentCode === 6) {
              flowData = [
                {
                  ...map.get(currentCode),
                  code: currentCode
                },
                {
                  ...map.get(currentCode + 1),
                  code: currentCode + 1
                },
                {
                  ...map.get(currentCode + 2),
                  code: currentCode + 2
                }
              ];
            } else if (currentCode === 10) {
              flowData = [
                {
                  ...map.get((currentCode - 2)),
                  code: currentCode - 2
                },
                {
                  ...map.get(currentCode - 1),
                  code: currentCode - 1
                },
                {
                  ...map.get(currentCode),
                  code: (currentCode)
                }
              ];
            }

            return {
              ...d,
              taskList: formatTask(d, list),
              currentCode,
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

    return {
      row,
      isOnOperation,
      loading,
      roomList,
      ...Events,
    };
  }
});
</script>
