import PropTypes from 'prop-types'
import { useMemo, useRef, useState } from 'react'
import Label from './Label'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from './InputValue'
import PickerWrapper from './PickerWrapper'
import InputError from './InputError'

function DatePicker({ label, required, value, setValue, validate }) {
  const dateInput = useRef(null)
  const koreanLocalDate = useMemo(() => {
    return value
      ? new Date(value).toLocaleString('ko-KR', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : ''
  }, [value])
  const [error, setError] = useState('')
  const onChange = e => {
    if (validate) {
      setError(validate(e.target.value))
    }
    setValue(e.target.value)
  }

  return (
    <div className='flex flex-col gap-2 py-3'>
      {label && (
        <Label text={label} required={required}>
          {error && <InputError>{error}</InputError>}
        </Label>
      )}
      <PickerWrapper onClick={() => dateInput.current.showPicker()}>
        <InputValue value={koreanLocalDate} label={label} />
        <MaterialIcon name='calendar_month' />
      </PickerWrapper>
      <input
        ref={dateInput}
        value={value}
        onChange={onChange}
        type='datetime-local'
        className={`${
          error && 'invalid'
        } fixed bottom-0 opacity-0 pointer-events-none`}
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
