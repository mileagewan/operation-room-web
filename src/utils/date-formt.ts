/*
*时间格式化工具
*/
import dayjs from 'dayjs'

/* 
*说明：传入'2021-10-11',返回'10月11日'
 */
export function MonthDay(year: string): String {
  if (!year) return ''
  const month = dayjs(year).month()
  const day = dayjs(year).date()
  return `${month}月${day}日`
}