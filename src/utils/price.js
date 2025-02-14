export function formatPrice(price) {
  return Intl.NumberFormat('ko-KR').format(price)
}

export function getMinimumBidUnit(price) {
  if (price < 10000) return 100
  if (price < 100000) return 1000
  if (price < 1000000) return 10000
  if (price < 10000000) return 100000
  return 1000000
}
