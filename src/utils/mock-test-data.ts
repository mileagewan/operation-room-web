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
