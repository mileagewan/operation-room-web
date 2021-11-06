/*
*时间格式化工具
*/
import dayjs from 'dayjs'

/*
*获取月日
*说明：传入'2021-10-11',返回'10月11日'
 */
export function getMonthDay(date: string): string {
  if (!date) return ''
  const month = dayjs(date).month()
  const day = dayjs(date).date()
  return `${month}月${day}日`
}
