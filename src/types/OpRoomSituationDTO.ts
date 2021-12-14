export default interface OpRoomSituationDTO {
  /**
   * 手术间名称
   */
  opRoomName: string;

  /**
   * 手术间状态 1 可用 2 清洁消毒中 3 手术中
   */
  opRoomStatus: number;

  /**
   * 当前手术台次
   */
  currentOpSeq: number;

  /**
   * 当天手术总台次
   */
  totalOpSeq: number;

  /**
   * 当前手术类型 1 平诊 2 急诊
   */
  currentOpType: number;

  /**
   * 当前手术进行阶段名称
   */
  currentOpSectionName: string;

  /**
   * 当前手术任务节点超时时间/秒
   */
  overTime: number;

  /**
   *   手术间ID
   */
  opRoomId: number;
}
