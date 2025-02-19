import { formatPrice } from './price'

const VALIDATIONS = {
  maxValue: (v, maximum) =>
    v && v > maximum && `${maximum} 이하로 입력해주세요.`,
  minValue: (v, minimum) =>
    v && v < minimum && `${minimum} 이상으로 입력해주세요.`,
  maxDate: (v, maximum) =>
    v &&
    new Date(v) > new Date(maximum) &&
    `${new Date(maximum).toLocaleString('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })} 까지만 가능해요`,
  minDate: (v, minimum) =>
    v &&
    new Date(v) <= new Date(minimum) &&
    `${new Date(minimum).toLocaleString('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })} 이후로 입력해주세요.`,
  maxPrice: (v, maximum) =>
    parseInt(v) > parseInt(maximum) &&
    `${formatPrice(maximum)}원 까지만 가능해요`,
  minPrice: (v, minimum) =>
    parseInt(v) < parseInt(minimum) &&
    `${formatPrice(minimum)}원 이상으로 입력해주세요.`,
  required: v => !v && '필수 입력사항이에요.',
  maxLength: (v, maximum) =>
    v && v.length > maximum && `${maximum}자 이내로 입력해주세요.`,
  minLength: (v, minimum) =>
    v && v.length < minimum && `${minimum}자 이상으로 입력해주세요.`,
  email: v =>
    v &&
    !/^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(
      v,
    ) &&
    '이메일 형식이 아닙니다.',
  nickname: v =>
    (/^[^가-힣a-zA-Z]*$/.test(v) && '한글, 영문을 포함해주세요.') ||
    (!/^[가-힣a-zA-Z0-9_]+$/.test(v) && '허용되지 않은 문자가 있어요.'),
  name: v =>
    v && !/^[가-힣a-zA-Z\s]+$/.test(v) && '한글, 영문으로 입력해주세요.',
  password: v =>
    // 영문, 숫자 조합 8~16자, 특수문자 하나 이상
    (/[^A-Za-z\d!@#$%^&()]/.test(v) && '허용되지 않는 문자가 있어요.') ||
    (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,16}$/.test(
      v,
    ) &&
      '영문, 숫자, 특수문자 조합 8~16자로 입력해주세요.'),
}

export { VALIDATIONS }
