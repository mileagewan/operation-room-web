import { Task } from '@/types/interface-model';
import { get } from 'lodash'

export default function TaskMixins () {
  const formatTask = (targetObj: any, task: Task[]): Task[] => {
    return task.map(t => {
      return {
        ...t,
        value: t.format ? t.format(get(targetObj, t.key)) : get(targetObj, t.key),
      }
    })
  }
  return {
    formatTask
  }
}

export const opInfoCode = (key = 'opInfo.code'): Task => {
  return {
    key: key,
    label: '手术号',
    value: ''
  }
}
export const hospitalCode = (key = 'patient.hospitalCode'): Task => {
  return {
    key: key,
    label: '住院号',
    value: ''
  }
}
export const departmentName = (key = 'opInfo.departmentName'): Task => {
  return {
    key: key,
    label: '科室',
    value: ''
  }
}
export const surgeonName = (key = 'opInfo.surgeonName'): Task => {
  return {
    key: key,
    label: '手术医生',
    value: ''
  }
}
export const circulatingNurseName = (key = 'opInfo.circulatingNurseName'): Task => {
  return {
    key: key,
    label: '巡回',
    value: ''
  }
}
export const anesthetistName = (key = 'opInfo.anesthetistName'): Task => {
  return {
    key: key,
    label: '麻醉师',
    value: ''
  }
}
export const anesthesiaDicCode = (key = 'opInfo.anesthesiaDicCode'): Task => {
  return {
    key: key,
    label: '麻醉方式',
    value: '',
  }
}
export const infectType = (key = 'opInfo.infectType'): Task => {
  return {
    key: key,
    label: '传染性感染',
    value: '',
    format(v:any) {
      switch (v) {
        case 1:
          return '未见异常';
        case 2:
          return '艾滋病毒'
        case 3:
          return '梅毒'
        case 4:
          return '乙肝'
        case 5:
          return '丙肝'
        case 6:
          return '新冠病毒 '
        case 7:
          return '结果未回(急诊)'
      }
    }
  }
}
export const opInfoName = (key = 'opInfo.name'): Task => {
  return {
    key: key,
    label: '手术名称',
    value: ''
  }
}
export const beforeDiseaseName = (key = 'opInfo.beforeDiseaseName'): Task => {
  return {
    key: key,
    label: '诊断',
    value: ''
  }
}
