interface PatientVo {
  name: string;
  birth: string;
  sex: number;
}
interface OpInfo {
  id: number;
  departmentId: number;
  departmentName: string;
  departmentWardId: number;
  departmentWardName: string;
  wardBedNumber: string;
  oproomId: number;
  oproomName: string;
  oproomSubId: number;
  oproomSubName: string;
  opSectionCode: string | number;
  opSectionName: string;
  code: string;
  name: string;
  startTime: string;
  endTime: string;
  type: number;
  seq: number;
  anesthesiaDicCode: string;
  surgeonId: string;
  surgeonName: string;
  anesthetistId: string;
  anesthetistName: string;
  circulatingNurseId: string;
  circulatingNurseName: string;
  instrumentNurseId: string;
  instrumentNurseName: string;
  patientId: number;
  beforeDiseaseId: number;
  beforeDiseaseName: string;
  afterDiseaseId: number;
  afterDiseaseName: string;
  infectType: any;
  cancel: number;
  deleted: number;
  createName: string;
  updateName: string;
  createTime: string;
  lastUpdateTime: string;
  opDescName: string;
  patientVo: PatientVo;
}
interface Patient {
  id: number;
  hospitalCode:string
  name:string
  birth:string
  sex: number;
  phone:string
  paperworkType: number;
  paperworkCode:string
  address:string
  deleted: number;
  createName:string
  updateName:string
  createTime:string
  lastUpdateTime:string;
}
interface OpTask{
  id: number;
  opCode:string
  opSectionCode:string|number;
  responsibilityUserId: number;
  handoverUserId: number;
  type: number;
  assignType: number;
  status: number;
  operatingStatus: number;
  waitingTime: number;
  waitingTimeLimit: number;
  executionTime: number;
  executionTimeLimit: number;
  deleted: number;
  createName:string;
  updateName:string;
  createTime:string;
  lastUpdateTime:string;
  taskTipContent?: string;
  parentTaskId?:string;
}
export interface TaskViewItem {
  opInfo: OpInfo;
  patient: Patient;
  opTask: OpTask;
  operatingStatusList: Array<any>;
  currentOperatingStatus: number;
}
export interface CurrentTaskViews {
  code: number;
  msg: string;
  data: TaskViewItem[];
}
