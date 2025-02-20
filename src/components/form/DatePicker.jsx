import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef, useState } from 'react'
import Label from './Label'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from './InputValue'
import PickerWrapper from './PickerWrapper'
import InputError from './InputError'

function DatePicker({
  label,
  required,
  value,
  setValue,
  validate,
  dependency,
}) {
  const dateInput = useRef(null)
  const [error, setError] = useState('')

  const koreanLocalDate = useMemo(() => {
    if (!value) return ''
    return new Date(value).toLocaleString().replace(/:\d{2}\s/, ' ')
  }, [value])

  useEffect(() => {
    if (!value) return
    if (validate) {
      setError(validate(value))
    }
  }, [dependency, value, validate])

  const onChange = e => {
    console.log(e.target.value)
    if (validate) {
      setError(validate(e.target.value))
    }
    setValue(e.target.value)
  }

  const handleClick = () => dateInput.current.showPicker()

  const onBlur = () => {
    if (validate) setError(validate(value))
    else setError('')
  }

  return (
    <div className='flex flex-col gap-2 py-3 '>
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
        className={`fixed bottom-0 opacity-0 pointer-events-none ${
          error ? 'invalid' : ''
        }`}
        onBlur={onBlur}
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
