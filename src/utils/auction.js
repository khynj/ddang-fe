export function parseTradeType({ isDirect, isPackage, pay }) {
  return isDirect
    ? isPackage
      ? pay == 'prepaid'
        ? '직거래 / 택배(선불)'
        : '직거래 / 택배(착불)'
      : '직거래'
    : pay == 'prepaid'
    ? '택배(선불)'
    : '택배(착불)'
}

export function getAuctionStatus(auction) {
  if (!auction) return -1
  const now = new Date().getTime()
  const start = new Date(auction.startTime).getTime()
  const end = new Date(auction.endTime).getTime()

  if (now < start) return 0
  if (auction.hammeredTime) return 2
  if (now >= end) return 2
  return 1
}

export function getAuctionNextTime(auction) {
  if (!auction) return null
  const now = new Date().getTime()
  const start = new Date(auction.startTime).getTime()
  const end = new Date(auction.endTime).getTime()
  if (now < start) return auction.startTime
  if (now < end) return auction.endTime
  return null
}
