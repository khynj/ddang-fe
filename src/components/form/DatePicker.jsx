import PropTypes from 'prop-types'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Label from './Label'
import MaterialIcon from '../icons/MaterialIcon'
import InputValue from './InputValue'
import PickerWrapper from './PickerWrapper'
import InputError from './InputError'

function DatePicker({ label, required, value, setValue, validate }) {
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const formatDateToString = (date) => {
    if (!date) return '';
    return date.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm" 형식으로 변환
  }

  const handleChange = (date) => {
    const newDateString = formatDateToString(date);
    const currentDateString = formatDateToString(value);

    // 문자열로 변환한 값이 같으면 업데이트하지 않음
    if (newDateString === currentDateString) {
      setIsOpen(false);
      return;
    }

    if (validate) {
      setError(validate(date))
    }
    setValue(date)
    setIsOpen(false)
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='flex flex-col gap-2 py-3'>
      {label && (
        <Label text={label} required={required}>
          {error && <InputError>{error}</InputError>}
        </Label>
      )}
      <PickerWrapper onClick={handleClick}>
        <InputValue
          value={value ? value.toLocaleString().replace(/:\d{2}\s/, ' ') : ''}
          label={label}
        />
        <MaterialIcon name='calendar_month' className='text-gray-600' />
      </PickerWrapper>
      <ReactDatePicker
        selected={value}
        onChange={handleChange}
        showTimeSelect
        dateFormat="yyyy/MM/dd HH:mm"
        timeIntervals={5}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        className="!absolute !h-0 !p-0 !m-0 opacity-0 pointer-events-none"
        wrapperClassName="!h-0 !p-0 !m-0"
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
