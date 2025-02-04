import PropTypes from 'prop-types'
import Label from './Label'
import { useState } from 'react'
import InputError from './InputError'

function TextInput({
  label,
  required,
  type = 'text',
  validate,
  value,
  setValue,
}) {
  const [error, setError] = useState('')
  const onChange = e => {
    const value = e.target.value
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
        type={type}
        value={value}
        onChange={onChange}
        className={`flex border-1 border-gray-300 rounded-md p-3 ${
          error ? 'invalid' : ''
        }`}
      />
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.func,
  value: PropTypes.any,
  setValue: PropTypes.func,
}

export default TextInput
