import { Task } from '@/types/interface-model';
import { TaskViewItem } from '@/types/CurrentTaskViews';

export const TaskList: Task[] = [
  {
    key: 'opInfo.code',
    label: '手术号',
    value: ''
  },
  {
    key: 'patient.hospitalCode',
    label: '住院号',
    value: ''
  },
  {
    key: 'opInfo.departmentName',
    label: '科室',
    value: ''
  },
  {
    key: 'opInfo.surgeonName',
    label: '手术医生',
    value: ''
  },
  {
    key: 'opInfo.circulatingNurseName',
    label: '巡回',
    value: ''
  },
  {
    key: 'opInfo.anesthetistName',
    label: '麻醉师',
    value: ''
  },
  {
    key: 'opInfo.anesthesiaDicCode',
    label: '麻醉方式',
    value: ''
  },
  {
    key: 'opInfo.infectType',
    label: '传染性感染',
    value: ''
  },
  {
    key: 'opInfo.name',
    label: '手术名称',
    value: ''
  },
  {
    key: 'opInfo.beforeDiseaseName',
    label: '诊断',
    value: ''
  },
  {
    key: 'opInfo.code',
    label: '状态',
    value: '',
    danger: true
  },
  {
    key: 'opInfo.code',
    label: '事件分析',
    value: '',
    danger: true
  },
]

export const FlowData: Array<{
  title: string,
  current?: boolean,
  icon: string,
}> = [
  {
    title: '到手术室',
    current: false,
    icon: 'todo-list-o',
  },
  {
    title: '到手术室',
    current: true,
    icon: 'todo-list-o'
  },
  {
    title: '到手术室',
    current: false,
    icon: 'todo-list-o'
  }
]

export const FlowData2: Array<{
  title: string,
  current?: boolean,
  icon: string,
}> = [
  {
    title: '开始',
    current: false,
    icon: 'todo-list-o',
  },
  {
    title: '转入核对',
    current: true,
    icon: 'todo-list-o'
  },
  {
    title: '三方确认',
    current: false,
    icon: 'todo-list-o'
  },
  {
    title: '三方确认',
    current: false,
    icon: 'todo-list-o'
  },
  {
    title: '三方确认',
    current: false,
    icon: 'todo-list-o'
  },
  {
    title: '三方确认',
    current: false,
    icon: 'todo-list-o'
  },
  {
    title: '三方确认',
    current: false,
    icon: 'todo-list-o'
  },
]

export const curentData: Array<{
  opInfo?: Array<{
    label: string,
    value: string,
    danger?: boolean
  }>,
  operatingStatusList?: Array<{
    title: string,
    current?: boolean,
    icon: string,
  }>,
  currentOperatingStatus: string,
  code: number
}> = [
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 1
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 2
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 3
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 4
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 5
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 6
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 7
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 8
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 9
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 10
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 11
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 12
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 13
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 14
  },
  {
    opInfo: TaskList,
    operatingStatusList: FlowData,
    currentOperatingStatus: '2',
    code: 15
  },
]

export const testdata: TaskViewItem[] = [
  {
    opInfo: {
      id: 0,
      departmentId: 0,
      departmentName: '',
      departmentWardId: 0,
      departmentWardName: '',
      wardBedNumber: '',
      oproomId: 0,
      oproomName: '',
      oproomSubId: 0,
      oproomSubName: '手术室-01-01',
      opSectionCode: 6,
      opSectionName: '',
      code: '',
      name: '江杨子正',
      startTime: '',
      endTime: '',
      type: 1,
      seq: 0,
      anesthesiaDicCode: '',
      surgeonId: '',
      surgeonName: '',
      anesthetistId: '',
      anesthetistName: '',
      circulatingNurseId: '',
      circulatingNurseName: '',
      instrumentNurseId: '',
      instrumentNurseName: '',
      patientId: 0,
      beforeDiseaseId: 0,
      beforeDiseaseName: '',
      afterDiseaseId: 0,
      afterDiseaseName: '',
      infectType: '无',
      cancel: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: '',
      opDescName: '',
      patientVo: {
        name: '江杨子正',
        birth: '',
        sex: 0
      }
    },
    patient: {
      id: 0,
      hospitalCode: '',
      name: '江杨子正',
      birth: '',
      sex: 0,
      phone: '',
      paperworkType: 0,
      paperworkCode: '',
      address: '',
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    opTask: {
      id: 0,
      opCode: '',
      opSectionCode: '',
      responsibilityUserId: 0,
      handoverUserId: 0,
      type: 1,
      assignType: 0,
      status: 0,
      operatingStatus: 0,
      waitingTime: 0,
      waitingTimeLimit: 0,
      executionTime: 0,
      executionTimeLimit: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    operatingStatusList: [],
    currentOperatingStatus: 0
  },
  {
    opInfo: {
      id: 0,
      departmentId: 0,
      departmentName: '',
      departmentWardId: 0,
      departmentWardName: '',
      wardBedNumber: '',
      oproomId: 0,
      oproomName: '',
      oproomSubId: 0,
      oproomSubName: '手术室-01-01',
      opSectionCode: 7,
      opSectionName: '',
      code: '',
      name: '江杨子正',
      startTime: '',
      endTime: '',
      type: 1,
      seq: 0,
      anesthesiaDicCode: '',
      surgeonId: '',
      surgeonName: '',
      anesthetistId: '',
      anesthetistName: '',
      circulatingNurseId: '',
      circulatingNurseName: '',
      instrumentNurseId: '',
      instrumentNurseName: '',
      patientId: 0,
      beforeDiseaseId: 0,
      beforeDiseaseName: '',
      afterDiseaseId: 0,
      afterDiseaseName: '',
      infectType: '无',
      cancel: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: '',
      opDescName: '',
      patientVo: {
        name: '江杨子正',
        birth: '',
        sex: 0
      }
    },
    patient: {
      id: 0,
      hospitalCode: '',
      name: '江杨子正',
      birth: '',
      sex: 0,
      phone: '',
      paperworkType: 0,
      paperworkCode: '',
      address: '',
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    opTask: {
      id: 0,
      opCode: '',
      opSectionCode: '',
      responsibilityUserId: 0,
      handoverUserId: 0,
      type: 1,
      assignType: 0,
      status: 0,
      operatingStatus: 0,
      waitingTime: 0,
      waitingTimeLimit: 0,
      executionTime: 0,
      executionTimeLimit: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    operatingStatusList: [],
    currentOperatingStatus: 0
  },
  {
    opInfo: {
      id: 0,
      departmentId: 0,
      departmentName: '',
      departmentWardId: 0,
      departmentWardName: '',
      wardBedNumber: '',
      oproomId: 0,
      oproomName: '',
      oproomSubId: 0,
      oproomSubName: '手术室-01-01',
      opSectionCode: 8,
      opSectionName: '',
      code: '',
      name: '江杨子正',
      startTime: '',
      endTime: '',
      type: 1,
      seq: 0,
      anesthesiaDicCode: '',
      surgeonId: '',
      surgeonName: '',
      anesthetistId: '',
      anesthetistName: '',
      circulatingNurseId: '',
      circulatingNurseName: '',
      instrumentNurseId: '',
      instrumentNurseName: '',
      patientId: 0,
      beforeDiseaseId: 0,
      beforeDiseaseName: '',
      afterDiseaseId: 0,
      afterDiseaseName: '',
      infectType: '无',
      cancel: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: '',
      opDescName: '',
      patientVo: {
        name: '江杨子正',
        birth: '',
        sex: 0
      }
    },
    patient: {
      id: 0,
      hospitalCode: '',
      name: '江杨子正',
      birth: '',
      sex: 0,
      phone: '',
      paperworkType: 0,
      paperworkCode: '',
      address: '',
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    opTask: {
      id: 0,
      opCode: '',
      opSectionCode: '',
      responsibilityUserId: 0,
      handoverUserId: 0,
      type: 1,
      assignType: 0,
      status: 0,
      operatingStatus: 0,
      waitingTime: 0,
      waitingTimeLimit: 0,
      executionTime: 0,
      executionTimeLimit: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    operatingStatusList: [],
    currentOperatingStatus: 0
  },
  {
    opInfo: {
      id: 0,
      departmentId: 0,
      departmentName: '',
      departmentWardId: 0,
      departmentWardName: '',
      wardBedNumber: '',
      oproomId: 0,
      oproomName: '',
      oproomSubId: 0,
      oproomSubName: '手术室-01-01',
      opSectionCode: 9,
      opSectionName: '',
      code: '',
      name: '江杨子正',
      startTime: '',
      endTime: '',
      type: 1,
      seq: 0,
      anesthesiaDicCode: '',
      surgeonId: '',
      surgeonName: '',
      anesthetistId: '',
      anesthetistName: '',
      circulatingNurseId: '',
      circulatingNurseName: '',
      instrumentNurseId: '',
      instrumentNurseName: '',
      patientId: 0,
      beforeDiseaseId: 0,
      beforeDiseaseName: '',
      afterDiseaseId: 0,
      afterDiseaseName: '',
      infectType: '无',
      cancel: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: '',
      opDescName: '',
      patientVo: {
        name: '江杨子正',
        birth: '',
        sex: 0
      }
    },
    patient: {
      id: 0,
      hospitalCode: '',
      name: '江杨子正',
      birth: '',
      sex: 0,
      phone: '',
      paperworkType: 0,
      paperworkCode: '',
      address: '',
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    opTask: {
      id: 0,
      opCode: '',
      opSectionCode: '',
      responsibilityUserId: 0,
      handoverUserId: 0,
      type: 1,
      assignType: 0,
      status: 0,
      operatingStatus: 0,
      waitingTime: 0,
      waitingTimeLimit: 0,
      executionTime: 0,
      executionTimeLimit: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    operatingStatusList: [],
    currentOperatingStatus: 0
  },
  {
    opInfo: {
      id: 0,
      departmentId: 0,
      departmentName: '',
      departmentWardId: 0,
      departmentWardName: '',
      wardBedNumber: '',
      oproomId: 0,
      oproomName: '',
      oproomSubId: 0,
      oproomSubName: '手术室-01-01',
      opSectionCode: 10,
      opSectionName: '',
      code: '',
      name: '江杨子正',
      startTime: '',
      endTime: '',
      type: 1,
      seq: 0,
      anesthesiaDicCode: '',
      surgeonId: '',
      surgeonName: '',
      anesthetistId: '',
      anesthetistName: '',
      circulatingNurseId: '',
      circulatingNurseName: '',
      instrumentNurseId: '',
      instrumentNurseName: '',
      patientId: 0,
      beforeDiseaseId: 0,
      beforeDiseaseName: '',
      afterDiseaseId: 0,
      afterDiseaseName: '',
      infectType: '无',
      cancel: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: '',
      opDescName: '',
      patientVo: {
        name: '江杨子正',
        birth: '',
        sex: 0
      }
    },
    patient: {
      id: 0,
      hospitalCode: '',
      name: '江杨子正',
      birth: '',
      sex: 0,
      phone: '',
      paperworkType: 0,
      paperworkCode: '',
      address: '',
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    opTask: {
      id: 0,
      opCode: '',
      opSectionCode: '',
      responsibilityUserId: 0,
      handoverUserId: 0,
      type: 1,
      assignType: 0,
      status: 0,
      operatingStatus: 0,
      waitingTime: 0,
      waitingTimeLimit: 0,
      executionTime: 0,
      executionTimeLimit: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    operatingStatusList: [],
    currentOperatingStatus: 0
  },
  {
    opInfo: {
      id: 0,
      departmentId: 0,
      departmentName: '',
      departmentWardId: 0,
      departmentWardName: '',
      wardBedNumber: '',
      oproomId: 0,
      oproomName: '',
      oproomSubId: 0,
      oproomSubName: '手术室-01-01',
      opSectionCode: 11,
      opSectionName: '',
      code: '',
      name: '江杨子正',
      startTime: '',
      endTime: '',
      type: 1,
      seq: 0,
      anesthesiaDicCode: '',
      surgeonId: '',
      surgeonName: '',
      anesthetistId: '',
      anesthetistName: '',
      circulatingNurseId: '',
      circulatingNurseName: '',
      instrumentNurseId: '',
      instrumentNurseName: '',
      patientId: 0,
      beforeDiseaseId: 0,
      beforeDiseaseName: '',
      afterDiseaseId: 0,
      afterDiseaseName: '',
      infectType: '无',
      cancel: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: '',
      opDescName: '',
      patientVo: {
        name: '江杨子正',
        birth: '',
        sex: 0
      }
    },
    patient: {
      id: 0,
      hospitalCode: '',
      name: '江杨子正',
      birth: '',
      sex: 0,
      phone: '',
      paperworkType: 0,
      paperworkCode: '',
      address: '',
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    opTask: {
      id: 0,
      opCode: '',
      opSectionCode: '',
      responsibilityUserId: 0,
      handoverUserId: 0,
      type: 1,
      assignType: 0,
      status: 0,
      operatingStatus: 0,
      waitingTime: 0,
      waitingTimeLimit: 0,
      executionTime: 0,
      executionTimeLimit: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: ''
    },
    operatingStatusList: [],
    currentOperatingStatus: 0
  },
]

export const testCompleteTotal = {
  code: 0,
  msg: '',
  data: {
    sendPatient: 1,
    receivePatient: 2,
    recoveryRoomPatient: 0,
    onTimeRate: '',
    opTaskListingDTOList: [
      {
        patient: {
          id: 0,
          hospitalCode: '',
          name: '江杨紫正',
          birth: '',
          sex: 0,
          phone: '',
          paperworkType: 0,
          paperworkCode: '',
          address: '',
          deleted: 0,
          createName: '',
          updateName: '',
          createTime: '',
          lastUpdateTime: ''
        },
        opInfo: {
          id: 0,
          departmentId: 0,
          departmentName: '手术室-01-01',
          departmentWardId: 0,
          departmentWardName: '',
          wardBedNumber: '',
          oproomId: 0,
          oproomName: '',
          oproomSubId: 0,
          oproomSubName: 'adsfasdf',
          opSectionCode: '',
          opSectionName: '',
          code: '',
          name: '',
          startTime: '',
          endTime: '',
          type: 0,
          seq: 0,
          anesthesiaDicCode: '',
          surgeonId: '',
          surgeonName: '',
          anesthetistId: '',
          anesthetistName: '',
          circulatingNurseId: '',
          circulatingNurseName: '',
          instrumentNurseId: '',
          instrumentNurseName: '',
          patientId: 0,
          beforeDiseaseId: 0,
          beforeDiseaseName: '',
          afterDiseaseId: 0,
          afterDiseaseName: '',
          infectType: '无',
          cancel: 0,
          deleted: 0,
          createName: '',
          updateName: '',
          createTime: '',
          lastUpdateTime: '',
          opDescName: '',
          patientVo: {
            name: '',
            birth: '',
            sex: 0
          }
        },
        opDescName: '',
        listingType: 0,
        remark: '',
        taskTime: 0,
        taskTimeOut: 0,
        opTaskDTO: {
          opInfo: {
            id: 0,
            departmentId: 0,
            departmentName: '',
            departmentWardId: 0,
            departmentWardName: '',
            wardBedNumber: '',
            oproomId: 0,
            oproomName: '',
            oproomSubId: 0,
            oproomSubName: '',
            opSectionCode: '',
            opSectionName: '',
            code: '',
            name: '',
            startTime: '',
            endTime: '',
            type: 0,
            seq: 0,
            anesthesiaDicCode: '',
            surgeonId: '',
            surgeonName: '',
            anesthetistId: '',
            anesthetistName: '',
            circulatingNurseId: '',
            circulatingNurseName: '',
            instrumentNurseId: '',
            instrumentNurseName: '',
            patientId: 0,
            beforeDiseaseId: 0,
            beforeDiseaseName: '',
            afterDiseaseId: 0,
            afterDiseaseName: '',
            infectType: '无',
            cancel: 0,
            deleted: 0,
            createName: '',
            updateName: '',
            createTime: '',
            lastUpdateTime: '',
            opDescName: '',
            patientVo: {
              name: '',
              birth: '',
              sex: 0
            }
          },
          patient: {
            id: 0,
            hospitalCode: '',
            name: '',
            birth: '',
            sex: 0,
            phone: '',
            paperworkType: 0,
            paperworkCode: '',
            address: '',
            deleted: 0,
            createName: '',
            updateName: '',
            createTime: '',
            lastUpdateTime: ''
          },
          opTask: {
            id: 0,
            opCode: '',
            opSectionCode: '',
            responsibilityUserId: 0,
            handoverUserId: 0,
            type: 0,
            assignType: 0,
            status: 0,
            operatingStatus: 0,
            waitingTime: 0,
            waitingTimeLimit: 0,
            executionTime: 0,
            executionTimeLimit: 0,
            deleted: 0,
            createName: '',
            updateName: '',
            createTime: '',
            lastUpdateTime: ''
          },
          operatingStatusList: [],
          currentOperatingStatus: 0
        }
      }
    ]
  }
}

export const roomList = {
  code: 0,
  msg: '',
  data: [
    {
      id: 0,
      departmentId: 0,
      code: '',
      name: '',
      bedNumber: 0,
      address: '',
      description: '',
      status: 0,
      deleted: 0,
      createName: '',
      updateName: '',
      createTime: '',
      lastUpdateTime: '',
      dtoList: [
        {
          opInfo: {
            id: 0,
            departmentId: 0,
            departmentName: '',
            departmentWardId: 0,
            departmentWardName: '',
            wardBedNumber: '',
            oproomId: 0,
            oproomName: '',
            oproomDepartmentId: 0,
            oproomDepartmentName: '',
            opSectionCode: '',
            opSectionName: '',
            code: '',
            name: '',
            startTime: '',
            endTime: '',
            type: 0,
            seq: 0,
            anesthesiaDicCode: '',
            surgeonId: '',
            surgeonName: '',
            anesthetistId: '',
            anesthetistName: '',
            circulatingNurseId: '',
            circulatingNurseName: '',
            instrumentNurseId: '',
            instrumentNurseName: '',
            patientId: 0,
            beforeDiseaseId: 0,
            beforeDiseaseName: '',
            afterDiseaseId: 0,
            afterDiseaseName: '',
            infectType: 0,
            cancel: 0,
            deleted: 0,
            createName: '',
            updateName: '',
            createTime: '',
            lastUpdateTime: '',
            opDescName: '',
            anesthesiaName: ''
          },
          patient: {
            id: 0,
            hospitalCode: '',
            name: '',
            birth: '',
            sex: 0,
            phone: '',
            paperworkType: 0,
            paperworkCode: '',
            address: '',
            deleted: 0,
            createName: '',
            updateName: '',
            createTime: '',
            lastUpdateTime: '',
            age: 0
          },
          opTask: {
            id: 0,
            opCode: '',
            opSectionCode: '',
            responsibilityUserId: 0,
            handoverUserId: 0,
            type: 0,
            assignType: 0,
            status: 0,
            operatingStatus: 0,
            waitingTime: 0,
            waitingTimeLimit: 0,
            executionTime: 0,
            executionTimeLimit: 0,
            deleted: 0,
            createName: '',
            updateName: '',
            createTime: '',
            lastUpdateTime: '',
            taskTipContent: ''
          },
          operatingStatusList: [],
          currentOperatingStatus: 0,
          age: 0
        }
      ],
      total: 0,
      normal: 0
    }
  ]
}
