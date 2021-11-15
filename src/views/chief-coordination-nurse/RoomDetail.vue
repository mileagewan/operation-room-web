<template>
  <div class="room-detail">
    <nav-bar :title="row.title" @goBack="goBack" />
    <div class="room-detail-content" v-if="isReady">
      <van-pull-refresh v-model="loading"
                        v-if="roomList.dtoList.length"
                        @refresh="onRefresh">
        <ExpandCard v-for="(list,index) in roomList.dtoList"
                    :key="index"
                    :option="{
                      status: list.opInfo.opSectionCode,
                      name: list.patient.name,
                      sex: list.patient.sex === 1 ? '男' : '女',
                      age: list.age,
                      type: list.opInfo.type,
                      room: `${list.opInfo.departmentName||''}-${list.opInfo.oproomName||''}-${list.opInfo.seq||''}`,
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
          <template v-if="isOnOperation.indexOf(list.opInfo.opSectionCode) > -1">
            <KeyValue label="状态节点">
              <template #value>
                <FlowChart :flow-data="list.flowData"
                           :current-code="list.currentCode" />
              </template>
            </KeyValue>
            <KeyValue label="手术室接送护士"
                      important
                      :value="`${list.handoverPerson.name} ${list.handoverPerson.phone}`" />
            <KeyValue label="巡回护士电话"
                      important
                      :value="`${list.responsiblePerson.name} ${list.responsiblePerson.phone}`" />
          </template>
          <template v-if="list.opInfo.opSectionCode === '16'">
            <KeyValue label="患者返回" :value="list.opInfo.departmentName"></KeyValue>
          </template>
        </ExpandCard>
      </van-pull-refresh>
      <EmptyPage v-if="!roomList.dtoList.length"></EmptyPage>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
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
      anesthesiaDicCode('anesthesiaName'),
      infectType(),
      opInfoName(),
      beforeDiseaseName(),
    ]
    const isOnOperation = ref<string[]>([
      '6',
      '7',
      '8',
      '9',
      '10',
    ])
    const row = ref({
      title: ''
    })
    const loading = ref<boolean>(false)
    const roomList = computed(() => {
      const room = store.state.chiefNur.room
      const formatDtoList = room.dtoList.map((d:any) => {
        const currentCode = Number(d.opInfo.opSectionCode);
        d.handoverPerson = d.handoverPerson || { name: '-', phone: '-' }
        d.responsiblePerson = d.responsiblePerson || { name: '-', phone: '-' }
        let flowData: any[] = []
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
          ]
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
          ]
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
          ]
        }

        return {
          ...d,
          taskList: formatTask(d, list),
          currentCode,
          flowData: flowData
        }
      });
      return reactive({
        ...room,
        dtoList: formatDtoList
      })
    })

    const onRefresh = () => {
      loading.value = false
    }
    const goBack = () => {
      router.back()
    }
    const isReady = ref(true)
    const setTitle = () => {
      row.value.title = String(roomList.value.name)
    }
    onMounted(() => {
      setTitle()
    })
    return {
      isReady,
      row,
      isOnOperation,
      loading,
      roomList,
      onRefresh,
      goBack,
      onMounted
    }
  }
})
</script>
