export function formatPrice(price) {
  return Intl.NumberFormat('ko-KR').format(price)
}

export function getMinimumBidUnit(price) {
  // 1%를 10의 n승으로 표현
  const n = Math.floor(Math.log10(price / 100))
  console.log(n)
  return 10 ** n
}
