export default interface OpTaskDTO {
  id: number;
  publishUserName: string;
  publishUserPhone: string;
  exeUserName: string;
  exeUserPhone: string;
  handUserName: string;
  handUserPhone: string;
  opInfoId: number;
  opSectionCode: string;
  roleId: number;
  flowId: number;
  parentFlowId: number;
  flowType: number;
}
