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
