export function dateToKst(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const offset = 18 * 60 // KST (UTC+9) offset in minutes
  const localDate = new Date(date.getTime() + offset * 60000)
  const isoString = localDate.toISOString().replace('Z', '+09:00')
  return isoString.slice(0, 19) + '+09:00'
}

export function dateLocale(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString()
}

export function kstToDate(dateString) {
  const date = new Date(dateString)
  const offset = 18 * 60 // KST (UTC+9) offset in minutes
  const localDate = new Date(date.getTime() + offset * 60000)
  return localDate.toISOString().slice(0, 19)
}

export function relativeTime(time) {
  const f = new Intl.RelativeTimeFormat('ko', {
    numeric: 'always',
  })
  const now = new Date()
  const target = new Date(time)
  const diff = now - target

  const day = diff / (1000 * 60 * 60 * 24)

  if (day >= 365) return f.format(-Math.floor(day / 365), 'year')
  if (day >= 30) return f.format(-Math.floor(day / 30), 'month')
  if (day >= 1) return f.format(-Math.floor(day), 'day')

  const hour = (day - Math.floor(day)) * 24

  if (hour >= 1) return f.format(-Math.floor(hour), 'hour')

  const min = (hour - Math.floor(hour)) * 60

  if (min >= 1) return f.format(-Math.floor(min), 'minute')

  return '방금'
}

export function dday(date) {
  const now = new Date()
  const targetDate = new Date(date)
  const diff = targetDate - now

  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  if (weeks > 0) return `${weeks}주 ${days}일`
  if (days > 0) return `${days}일 ${hours}시간`
  return hours === 0
    ? minutes === 0
      ? `${seconds}초`
      : `${minutes}:${seconds}`
    : `${hours}시간`
}

export function convertDateToUTC(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  )
}
