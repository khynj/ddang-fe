export function dateToKst(dateString) {
  const date = new Date(dateString)
  const offset = 9 * 60 // KST (UTC+9) offset in minutes
  const localDate = new Date(date.getTime() + offset * 60000)
  const isoString = localDate.toISOString().replace('Z', '+09:00')
  return isoString.slice(0, 19) + '+09:00'
}

export function dateLocale(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString()
}
