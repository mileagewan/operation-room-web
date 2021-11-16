export default function formatTime(seconds: number): string {
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

  let result = ss + '秒';
  if (mm > 0) result = mm + '分' + result;

  if (hh > 0) result = hh + '时' + result;
  return result;

  // const hours = seconds / 3600;
}
