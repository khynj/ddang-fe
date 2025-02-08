const DEAL_TYPES = [
  {
    value: '직거래',
    isPackage: false,
    isDirect: true,
    pay: '',
  },
  {
    value: '택배(선불)',
    isPackage: true,
    isDirect: false,
    pay: 'prepaid',
  },
  {
    value: '택배(착불)',
    isPackage: true,
    isDirect: false,
    pay: 'postpaid',
  },
  {
    value: '직거래 / 택배(선불)',
    isPackage: true,
    isDirect: true,
    pay: 'prepaid',
  },
  {
    value: '직거래 / 택배(착불)',
    isPackage: true,
    isDirect: true,
    pay: 'postpaid',
  },
]

export default DEAL_TYPES
