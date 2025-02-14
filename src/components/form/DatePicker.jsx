import PropTypes from 'prop-types'
import { useMemo, useRef, useState } from 'react'
import Label from './Label'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from './InputValue'
import PickerWrapper from './PickerWrapper'
import InputError from './InputError'

function DatePicker({ label, required, value, setValue, validate }) {
  const dateInput = useRef(null)
  const [error, setError] = useState('')
  
  const koreanLocalDate = useMemo(() => {
    return value
      ? new Date(value).toLocaleString('ko-KR', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : ''
  }, [value])

  const onChange = e => {
    if (validate) {
      setError(validate(e.target.value))
    }
    setValue(e.target.value)
  }

  // iOS 체크
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  const handleClick = () => {
    if (isIOS) {
      // iOS의 경우 input을 직접 클릭
      dateInput.current.click()
    } else {
      // 안드로이드의 경우 showPicker 사용
      dateInput.current.showPicker()
    }
  }

  return (
    <div className='flex flex-col gap-2 py-3'>
      {label && (
        <Label text={label} required={required}>
          {error && <InputError>{error}</InputError>}
        </Label>
      )}
      <PickerWrapper onClick={handleClick}>
        <InputValue value={koreanLocalDate} label={label} />
        <MaterialIcon name='calendar_month' className='text-gray-600' />
      </PickerWrapper>
      <input
        ref={dateInput}
        value={value}
        onChange={onChange}
        type='datetime-local'
        className={`${
          error && 'invalid'
        } ${isIOS ? 'absolute' : 'fixed'} bottom-0 opacity-0 ${
          isIOS ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      />
    </div>
  )
}

DatePicker.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  setValue: PropTypes.func,
  validate: PropTypes.func,
}

export default DatePicker
