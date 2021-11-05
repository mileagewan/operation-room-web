export default (code: string): string => {
  let result = '';
  // const codeMap = {}
  const codeMap: any = {
    1: '手术排台',
    2: '未开始手术',
    3: '术前准备',
    4: '送手术',
    5: '转送中',
    6: '到手术室',
    7: '到手术间',
    8: '麻醉',
    9: '手术中',
    10: '苏醒',
    11: '进复苏室',
    12: '复苏室苏醒',
    13: '出复苏室',
    14: '出手术室',
    15: '回病房',
    16: '手术结束',
    '-99': '手术取消',
  };
  result = codeMap[code];
  return result ?? '';
};
