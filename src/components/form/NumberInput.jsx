import PropTypes from 'prop-types'
import Label from './Label'
import { useState } from 'react'
import InputError from './InputError'
import { formatPrice } from '@/utils/price'

function NumberInput({ label, required, value, setValue, validate }) {
  const [error, setError] = useState('')
  const onChange = e => {
    // 숫자만 추출
    const numericValue = e.target.value.replace(/[^0-9]/g, '')
    const value = numericValue ? parseInt(numericValue) : 0

    if (validate) {
      setError(validate(value))
    }
    setValue(value)
  }

  return (
    <div className='flex flex-col gap-2 py-3'>
      {label && (
        <Label text={label} required={required}>
          <InputError>{error}</InputError>
        </Label>
      )}
      <input
        type='text'
        value={formatPrice(value)}
        onChange={onChange}
        className={`flex border-1 border-gray-300 rounded-md p-3 ${
          error ? 'invalid' : ''
        }`}
        inputMode='numeric'
      />
    </div>
  )
}

NumberInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.func,
  value: PropTypes.any,
  setValue: PropTypes.func,
}

export default NumberInput
