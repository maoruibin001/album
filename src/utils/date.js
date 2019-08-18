export function dateFormat (date = new Date(), yearDivider = '-', hourDivider = ':') {
  if (!date) return ''
  const _date = new Date(date)
  const year = _date.getFullYear()
  const month = _date.getMonth() + 1
  const day = _date.getDate()
  const hour = _date.getHours()
  const m = _date.getMinutes()
  const s = _date.getSeconds()

  return [year, month, day].join(yearDivider) + ' ' + [hour, m, s].join(hourDivider)
}

export function getGapDay (date = new Date(), anchorDate = new Date()) {
  if (!date || !anchorDate) throw new Error('请传入有效日期')
  const ONEDAY = 1 * 24 * 60 * 60 * 1000
  const ONEHour = 1 * 60 * 60 * 1000
  const dateTime = new Date(date).setHours(0, 0, 0, 0)
  const anchorDateTime = new Date(anchorDate).setHours(0, 0, 0, 0)
  const gapDay = parseInt((dateTime - anchorDateTime) / ONEDAY)
  if (gapDay === 0) {
    const gapHours = parseInt((new Date(date).getTime() - new Date(anchorDate).getTime()) / ONEHour)
    return gapHours > 0 ? gapHours + '小时后' : (gapHours === 0 ? '刚刚' : -gapHours + '小时前')
  } else {
    return gapDay > 0 ? gapDay + '天后' : -gapDay + '天前'
  }
}
