export function formatPrice(price) {
  return Intl.NumberFormat('ko-KR').format(price)
}
