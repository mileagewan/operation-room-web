<template>
  <div class="room-detail">
    <nav-bar :title="row.title" @goBack="goBack" />
    <div class="room-detail-content" v-if="isReady">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <ExpandCard v-for="(list,index) in roomList.dtoList"
                    :key="index"
                    :option="{
                      status: list.opInfo.opSectionCode,
                      name: list.patient.name,
                      sex: list.patient.sex === 1 ? '男' : '女',
                      age: list.age,
                      type: list.opInfo.type,
                      room: list.opInfo.oproomName,
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
        </ExpandCard>
      </van-pull-refresh>

    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
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
    ]
    const row = reactive({
      title: '手术间01间'
    })
    const loading = ref<boolean>(false)
    const roomList = computed(() => {
      const room = store.state.chiefNur.room
      debugger
      const formatDtoList = room.dtoList.map((d:any) => {
        return {
          ...d,
          taskList: formatTask(d, list)
        }
      })
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
    const isReady = ref(false)
    if (!roomList.value) {
      router.back()
    } else {
      isReady.value = true
    }
    return {
      isReady,
      row,
      loading,
      roomList,
      onRefresh,
      goBack
    }
  }
})
</script>
