export function scoreToText(score) {
  switch (score) {
    case 1:
      return '매우의심'
    case 2:
      return '의심'
    case 3:
      return '보통'
    case 4:
      return '신뢰'
    case 5:
      return '완전신뢰'
    default:
      return ''
  }
}
