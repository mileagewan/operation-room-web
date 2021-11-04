export const TaskList: Array<{
  label: string,
  value: string,
  danger?: boolean
}> = [
  {
    label: '手术号',
    value: '20215612621'
  },
  {
    label: '住院号',
    value: '20215612621'
  },
  {
    label: '科室',
    value: '脊柱外科'
  },
  {
    label: '手术医生',
    value: '钟云飞，暗示法'
  },
  {
    label: '巡回',
    value: '阿斯顿'
  },
  {
    label: '麻醉师',
    value: '史昂一'
  },
  {
    label: '麻醉方式',
    value: '全麻'
  },
  {
    label: '传染性感染',
    value: '无'
  },
  {
    label: '手术名称',
    value: 'L3/4、L4/5黄阿水淀粉开户'
  },
  {
    label: '诊断',
    value: '脊柱的外科'
  },
  {
    label: '状态',
    value: '延误3分钟',
    danger: true
  },
  {
    label: '事件分析',
    value: '转运超时',
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
