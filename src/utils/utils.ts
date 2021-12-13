/**
 * 获取数据的一个节点，否则返回空
 * @param nodeArr
 * @param callback
 */
export const findNode:any = (nodeArr: any[], callback: (d:any) => any) => {
  const index = nodeArr.findIndex(callback);
  if (index > -1) {
    return nodeArr[index]
  } else {
    return undefined;
  }
};
