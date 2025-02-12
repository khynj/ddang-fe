import PropTypes from 'prop-types'
import Label from './Label'
import { useState } from 'react'
import InputError from './InputError'

function NumberInput({ label, required, value, setValue, validate }) {
  const [error, setError] = useState('')
  const onChange = e => {
    const value = Number(e.target.value).toString()
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
        type='number'
        value={value}
        onChange={onChange}
        className={`flex border-1 border-gray-300 rounded-md p-3 ${
          error ? 'invalid' : ''
        }`}
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
