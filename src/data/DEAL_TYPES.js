const DEAL_TYPES = [
  {
    value: '직거래',
    isDirect: true,
    isPackage: false,
    parcelFeeOption: undefined,
  },
  {
    value: '택배(선불)',
    isDirect: false,
    isPackage: true,
    parcelFeeOption: 'PREPAID',
  },
  {
    value: '택배(착불)',
    isDirect: false,
    isPackage: true,
    parcelFeeOption: 'COD',
  },
  {
    value: '직거래 / 택배(선불)',
    isDirect: true,
    isPackage: true,
    parcelFeeOption: 'PREPAID',
  },
  {
    value: '직거래 / 택배(착불)',
    isDirect: true,
    isPackage: true,
    parcelFeeOption: 'COD',
  },
]

export default DEAL_TYPES
