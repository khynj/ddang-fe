import { getAuctionStatus } from './auction'

export function UTCToDate(dateString) {
  // return new Date(dateString)
  return new Date(new Date(dateString).toString() + ' UTC')
}

export function shortRelativeTime(time) {
  const f = new Intl.RelativeTimeFormat('ko', {
    numeric: 'always',
  })
  const now = new Date()
  const target = new Date(time)
  let diff = now - target

  if (diff < 0) diff = -diff

  const day = diff / (1000 * 60 * 60 * 24)

  if (day >= 365) return f.format(-Math.floor(day / 365), 'year')
  if (day >= 30) return f.format(-Math.floor(day / 30), 'month')
  if (day >= 1) return f.format(-Math.floor(day), 'day')

  const hour = (day - Math.floor(day)) * 24

  if (hour >= 1) return f.format(-Math.floor(hour), 'hour')

  const min = (hour - Math.floor(hour)) * 60

  if (min >= 1) return f.format(-Math.floor(min), 'minute')

  return f.format(-Math.floor(diff / 1000), 'second')
}

export function relativeTime(time) {
  const f = new Intl.RelativeTimeFormat('ko', {
    numeric: 'auto',
  })
  const now = new Date()
  const target = new Date(time)
  let diff = now - target

  if (diff < 0) diff = -diff

  const day = diff / (1000 * 60 * 60 * 24)

  if (day >= 365) return f.format(-Math.floor(day / 365), 'year')
  if (day >= 30) return f.format(-Math.floor(day / 30), 'month')
  if (day >= 1) return f.format(-Math.floor(day), 'day')

  const hour = (day - Math.floor(day)) * 24

  if (hour >= 1) return f.format(-Math.floor(hour), 'hour')

  const min = (hour - Math.floor(hour)) * 60

  return f.format(-Math.floor(min), 'minute')
}

export function dday(date) {
  const now = new Date()
  const targetDate = new Date(date)
  const diff = targetDate - now

  if (diff < 0) return false
  formatTimeDiff(diff)
}

export function formatTimeDiff(diff) {
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  if (years > 0) return `${years}년`
  if (months > 0) return `${months}개월`
  if (weeks > 0) return `${weeks}주`
  if (days > 0) return `${days}일`
  return hours === 0
    ? minutes === 0
      ? `${seconds}초`
      : `${minutes}:${seconds}`
    : `${hours}시간`
}

export function getAuctionTimeString(auction) {
  const status = getAuctionStatus(auction)
  if (status == 2) return '경매 종료됨'

  const date = status == 0 ? auction.startTime : auction.endTime

  const now = new Date().getTime()
  const targetDate = new Date(date).getTime()
  const diff = targetDate - now

  if (diff < 0) return '...'

  let res = formatTimeDiff(diff)
  if (status == 0) return `${res} 후 시작`
  return `${res} 남음`
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
