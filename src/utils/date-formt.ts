/*
 *时间格式化工具
 */
import dayjs from 'dayjs';

/*
 *获取月日
 *说明：传入'2021-10-11',返回'10月11日'
 */
export function getMonthDay(date: string): string {
  if (!date) return '';
  const month = dayjs(date).month();
  const day = dayjs(date).date();
  return `${month}月${day}日`;
}

export function formatTime(seconds: number): string {
  let ss = Math.floor(seconds); // 秒
  let mm = 0; // 分
  let hh = 0; // 小时
  if (ss > 60) {
    mm = Math.floor(ss / 60);
    ss = Math.floor(ss % 60);
  }
  if (mm > 60) {
    hh = Math.floor(mm / 60);
    mm = Math.floor(mm % 60);
  }

  let result = ('00' + Math.floor(ss)).slice(-2);
  if (mm > 0) result = ('00' + Math.floor(mm)).slice(-2) + ':' + result;
  else result = '00:' + result;

  if (hh > 0) result = ('00' + Math.floor(hh)).slice(-2) + ':' + result;
  return result;

  // const hours = seconds / 3600;
}
