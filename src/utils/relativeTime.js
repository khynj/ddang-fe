export default function relativeTime(time) {
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
