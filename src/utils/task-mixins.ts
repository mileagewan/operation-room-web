import { Task } from '@/types/interface-model';
import { get } from 'lodash'

export default function TaskMixins () {
  const formatTask = (targetObj: any, task: Task[]): Task[] => {
    return task.map(t => {
      return {
        ...t,
        value: get(targetObj, t.key),
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
    value: ''
  }
}
export const infectType = (key = 'opInfo.infectType'): Task => {
  return {
    key: key,
    label: '传染性感染',
    value: '',
    danger: true
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
