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

/*
 *获取时分
 *说明：传入date类型字符串,返回例'09：00'
 */
export const getHourMinute = (date: string): string => {
  if (!date) return "";
  const hour =
    dayjs(date).hour() < 10 ? "0" + dayjs(date).hour() : dayjs(date).hour();
  const minute =
    dayjs(date).minute() < 10
      ? "0" + dayjs(date).minute()
      : dayjs(date).minute();
  return hour + ":" + minute;
}
/*
 *获取周一到周天
 *说明：传入0-6,返回例'周天'
 */
export const getWeekZh = (week: number): string => {
  let value = "";
  if (week == null) return value;
  switch (week) {
    case 0:
      value = "周天";
      break;
    case 1:
      value = "周一";
      break;
    case 2:
      value = "周二";
      break;
    case 3:
      value = "周三";
      break;
    case 4:
      value = "周四";
      break;
    case 5:
      value = "周五";
      break;
    case 6:
      value = "周六";
      break;
  }
  return value;
}
/*
 *获取月日周
 *说明：传入date类型字符串,返回例'10月10日（周一）'
 */
export const getMonthDayWeek = (date: string): string => {
  if (!date) return "";
  const month = dayjs(date).month() + 1;
  const day = dayjs(date).date();
  const week = dayjs(date).day();
  const weekZh = "(" + getWeekZh(week) + ")";
  return month + "月" + day + "日" + weekZh;
}
/*
 *获取月日
 *说明：传入date类型字符串,返回例'10-01'
 */
export const getMonthDay_ = (date: string): string => {
  if (!date) return "";
  let month = '00' + (dayjs(date).month() + 1);
  month = month.slice(-2);
  const day = ('00' + String(dayjs(date).date())).slice(-2);
  return month + "-" + day
}
/*
 *获取起始时间
 *说明：传入(date,date)类型字符串,返回例'09:00-10:00'
 */
export const getOperatTime = (startTime: string, endTime: string):string => {
  const _start = getHourMinute(startTime);
  const _end = getHourMinute(endTime);
  return _start + "-" + _end;
}
