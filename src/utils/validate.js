const validate = {
  maxValue: (v, maximum) =>
    v &&
    v &&
    v > maximum &&
    `${Intl.NumberFormat('ko-KR').format(maximum)}까지만 가능해요`,
  minValue: (v, minimum) =>
    v &&
    v < minimum &&
    `${Intl.NumberFormat('ko-KR').format(minimum)} 이상으로 입력해주세요.`,
  required: v => !v && '필수 입력사항이에요.',
  maxLength: (v, maximum) =>
    v &&
    v.length > maximum &&
    `${Intl.NumberFormat('ko-KR').format(maximum)}자 이내로 입력해주세요.`,
  minLength: (v, minimum) =>
    v &&
    v.length < minimum &&
    `${Intl.NumberFormat('ko-KR').format(minimum)}자 이상으로 입력해주세요.`,
}

export { validate }
