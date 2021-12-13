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
  hospitalCode: string
  name: string
  birth: string
  sex: number;
  phone: string
  paperworkType: number;
  paperworkCode: string
  address: string
  deleted: number;
  createName: string
  updateName: string
  createTime: string
  lastUpdateTime: string;
}

interface OpTask {
  id: number;
  opCode: string
  opSectionCode: string | number;
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
  createName: string;
  updateName: string;
  createTime: string;
  lastUpdateTime: string;
  taskTipContent?: string;
  parentTaskId?: string;
}

export interface TaskViewItem {
  isClean?: boolean;
  opInfo: OpInfo;
  patient: Patient;
  opTask: OpTask;
  operatingStatusList: Array<any>;
  currentOperatingStatus: number;
  responsiblePerson?: any;
  handoverPerson?: any;
}

export interface CurrentTaskViews {
  code: number;
  msg: string;
  data: TaskViewItem[];
}
//
export interface TaskItem {
  opTaskDTO?: any;
  opInfoDTO?: any;
  opInfoExtDTO?: any;
  opPatientDTO?: any;
  flowPointMap?: any;
}

export interface CompleteOpTask {
  onTimeNum: number,
  patientNum: number,
  completedOpTaskDetailsDTOList: Array< {
    receiveFlag: number,
    exeTime: number,
    totalOverTime: number,
    opInfoDTO: {
      id: number,
      name: string,
      descName: string,
      code: string,
      opSectionCode: string,
      opSectionName: string,
      type: number,
      opRoomId: number
    },
    opInfoExtDTO: {
      surgeonName: string,
      anesthetistName: string,
      circulatingNurseName: string
    },
    opPatientDTO: {
      name: string,
      sex: number,
      age: number,
      hospitalCode: string,
      beforeDepartmentName: string,
      beforeDepartmentWardName: string,
      beforeWardBedNumber: string,
      afterDepartmentName: string,
      afterDepartmentWardName: string,
      anesthesiaItemName: string,
      beforeDiseaseName: string,
      infectTypeItemName: string,
      beforeDepartmentWardId: number
    }
  }>,
  receivePatientNum: number,
  sendPatientNum: number,
  cleanNum: number,
  completedOpCleanTaskDetailsDTOList: Array< {
    descName: string,
    cleanExeUserName: string,
    cleanExeUserPhone: string,
    cleanStartTime: string,
    cleanEndTime: string,
    disinfectStartTime: string,
    disinfectEndTime: string
  }>
}

export interface CurrentComplete {
  code: number;
  msg: string;
  data: CompleteOpTask[];
}
