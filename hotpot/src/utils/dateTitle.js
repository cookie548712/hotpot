/** 纪念卡标题：2026.9.3 的火锅 */
export function memorialTitle(date = new Date()) {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}.${m}.${d} 的火锅`
}
