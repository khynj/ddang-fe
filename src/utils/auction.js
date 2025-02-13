/*
[
  {
    value: '직거래',
    isPackage: false,
    isDirect: true,
    parcelFeeOption: 'none',
  },
  {
    value: '택배(선불)',
    isPackage: true,
    isDirect: false,
    parcelFeeOption: 'prepaid',
  },
  {
    value: '택배(착불)',
    isPackage: true,
    isDirect: false,
    parcelFeeOption: 'cod',
  },
  {
    value: '직거래 / 택배(선불)',
    isPackage: true,
    isDirect: true,
    parcelFeeOption: 'prepaid',
  },
  {
    value: '직거래 / 택배(착불)',
    isPackage: true,
    isDirect: true,
    parcelFeeOption: 'cod',
  },
]
*/

import DEAL_TYPES from '@/data/DEAL_TYPES'

export function parseTradeType({ isDirect, isPackage, pay }) {
  // get value from DEAL_TYPES
  const tradeType = DEAL_TYPES.find(
    type =>
      toString(type.isDirect).toLowerCase() ==
        toString(isDirect).toLowerCase() &&
      toString(type.isPackage).toLowerCase() ==
        toString(isPackage).toLowerCase() &&
      toString(type.parcelFeeOption).toLowerCase() ==
        toString(pay).toLowerCase(),
  )
  return tradeType?.value || '상의'
}
